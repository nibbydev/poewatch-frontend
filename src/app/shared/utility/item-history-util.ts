import { ItemEntryLeague } from '../api/item-entry';
import { ItemHistory } from '../api/item-history';
import { ChartResult, ChartSequence, ChartSeriesDef } from '../chart-result';
import { DateUtil } from './date-util';

export class ItemHistoryUtil {

  private static readonly msInDay = 86400000;

  public static convert(il: ItemEntryLeague, h: ItemHistory[], sd: ChartSeriesDef[]): ChartResult[] {
    const dates = this.calculateDates(il, h);
    const output = [];

    for (const s of sd) {
      const elem = {
        name: s.name,
        color: s.color,
        series: []
      } as ChartResult;

      this.padHistory(il, h, dates, elem);
      output.push(elem);
    }

    return output;
  }

  // null values: https://github.com/swimlane/ngx-charts/issues/799
  private static padHistory(il: ItemEntryLeague, h: ItemHistory[], dates: DateSet, elem: ChartResult): void {
    // If entries are missing before the first entry, fill with "No data"
    if (dates.daysMissingStart) {
      const date = DateUtil.roundDate(new Date(dates.startDate));

      for (let i = 0; i < dates.daysMissingStart; i++) {
        elem.series.push({
          name: DateUtil.incDate(date, i),
          value: 0,
          extra: {
            sequence: ChartSequence.LeftPad,
            color: elem.color
          }
        });
      }
    }

    // Add actual history data
    for (let i = 0; i < h.length; i++) {
      const entry = h[i];

      elem.series.push({
        name: DateUtil.roundDate(new Date(entry.time)),
        value: entry[elem.name],
        extra: {
          sequence: ChartSequence.Default,
          color: elem.color
        }
      });

      // Check if there are any missing entries between the current one and the next one
      if (i + 1 < h.length) {
        const nextEntry = h[i + 1];

        // Get dates
        const currentDate = DateUtil.roundDate(new Date(entry.time));
        const nextDate = DateUtil.roundDate(new Date(nextEntry.time));

        // Get difference in days between entries
        const timeDiff = Math.abs(nextDate.getTime() - currentDate.getTime());
        const diffDays = Math.floor(timeDiff / (1000 * 3600 * 24)) - 1;

        // Fill missing days with "No data" (if any)
        for (let j = 0; j < diffDays; j++) {
          elem.series.push({
            name: DateUtil.incDate(currentDate, j + 1),
            value: 0,
            extra: {
              sequence: ChartSequence.CenterFill,
              color: elem.color
            }
          });
        }
      }
    }

    // If entries are missing after the first entry, fill with "No data"
    if (dates.daysMissingEnd && dates.lastDate) {
      const date = DateUtil.roundDate(new Date(dates.lastDate));
      date.setDate(date.getDate() + 1);

      for (let i = 0; i < dates.daysMissingEnd; i++) {
        elem.series.push({
          name: DateUtil.incDate(date, i),
          value: 0,
          extra: {
            sequence: ChartSequence.RightPad,
            color: elem.color
          }
        });
      }
    }

    // Add current values
    if (il.active) {
      const date = DateUtil.floorDate(new Date());
      elem.series.push({
        name: date,
        value: il[elem.name],
        extra: {
          sequence: ChartSequence.Current,
          color: elem.color
        }
      });
    }

    // Bloat using 'null's the amount of days that should not have a tooltip.
    // Or in other words the number of days left in the league
    if (dates.emptyPadding) {
      const lastElem = elem.series[elem.series.length - 1];
      const date = DateUtil.roundDate(new Date(lastElem.name));
      date.setDate(date.getDate() + 1);

      for (let i = 0; i < dates.emptyPadding; i++) {
        elem.series.push({
          name: DateUtil.incDate(date, i),
          value: 0,
          extra: {
            sequence: ChartSequence.EmptyPad,
            color: elem.color
          }
        });
      }
    }
  }

  private static calculateDates(il: ItemEntryLeague, h: ItemHistory[]): DateSet {
    const dates = new DateSet();

    // If there are any history entries for this league, find the first and last date
    if (h.length) {
      dates.firstDate = DateUtil.roundDate(new Date(h[0].time));
      dates.lastDate = DateUtil.roundDate(new Date(h[h.length - 1].time));
    }

    // League should always have a start date
    if (il.start) {
      dates.startDate = DateUtil.roundDate(new Date(il.start));
    }

    // Permanent leagues don't have an end date
    if (il.end) {
      dates.endDate = DateUtil.roundDate(new Date(il.end));
    }

    // Find duration for non-permanent leagues
    if (dates.startDate && dates.endDate) {
      dates.totalDays = Math.floor(Math.abs(dates.endDate.getTime() - dates.startDate.getTime()) / this.msInDay);

      if (il.active) {
        dates.elapsedDays = Math.floor(Math.abs(new Date().getTime() - dates.startDate.getTime()) / this.msInDay);
      } else {
        dates.elapsedDays = dates.totalDays;
      }
    }

    // Find how many days worth of data is missing from the league start
    if (il.id > 2) {
      if (dates.firstDate && dates.startDate) {
        dates.daysMissingStart = Math.floor(Math.abs(dates.firstDate.getTime() - dates.startDate.getTime()) / this.msInDay);
      }
    }

    // Find how many days worth of data is missing from the league end, if league has ended
    if (il.active) {
      // League is active, compare time of last entry to right now
      if (dates.lastDate) {
        dates.daysMissingEnd = Math.floor(Math.abs(new Date().getTime() - dates.lastDate.getTime()) / this.msInDay);
      }
    } else {
      // League has ended, compare time of last entry to time of league end
      if (dates.lastDate && dates.endDate) {
        dates.daysMissingEnd = Math.floor(Math.abs(dates.lastDate.getTime() - dates.endDate.getTime()) / this.msInDay);
      }
    }

    // Find number of ticks the graph should be padded with empty entries on the left
    if (il.id > 2) {
      if (dates.totalDays !== null && dates.elapsedDays !== null) {
        // todo: rounding errors during certain parts of the day
        // case 1: totalDays is 1 too big or elapsedDays is 1 too small, pads by 1 too many
        // case 2: it rounds fine, everything works as intended
        dates.emptyPadding = dates.totalDays - dates.elapsedDays;
      }
    } else {
      dates.emptyPadding = 120 - h.length;
    }

    return dates;
  }

}

class DateSet {
  firstDate: Date;
  lastDate: Date;
  totalDays: number;
  elapsedDays: number;
  startDate: Date;
  endDate: Date;
  daysMissingStart: number;
  daysMissingEnd: number;
  emptyPadding: number;
}
