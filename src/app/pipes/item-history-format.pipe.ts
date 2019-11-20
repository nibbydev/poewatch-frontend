import {Injectable, Pipe, PipeTransform} from '@angular/core';
import {ItemEntryLeague} from '../shared/api/item-entry';
import {ItemHistory} from '../shared/api/item-history';

@Pipe({
  name: 'itemHistoryFormat'
})
@Injectable({
  providedIn: 'root'
})
export class ItemHistoryFormatPipe implements PipeTransform {

  transform(value: any[], args?: any): any[] {
    return null;
  }

  public formatHistory(il: ItemEntryLeague, h: ItemHistory[]): { keys, vals } {
    const dates = this.calculateDates(il, h);
    return this.padHistory(il, h, dates);
  }

  private padHistory(il: ItemEntryLeague, h: ItemHistory[], data): { keys, vals } {
    const output = {
      keys: [],
      vals: {
        mean: [],
        median: [],
        mode: [],
        daily: [],
        current: [],
      }
    };

    // If entries are missing before the first entry, fill with "No data"
    if (data.daysMissingStart) {
      const date = new Date(data.startDate);

      for (let i = 0; i < data.daysMissingStart; i++) {
        output.vals.mean.push(0);
        output.vals.median.push(0);
        output.vals.mode.push(0);
        output.vals.daily.push(0);
        output.vals.current.push(0);
        output.keys.push(this.formatDate(this.incDate(date, i)));
      }
    }

    // Add actual history data
    for (let i = 0; i < h.length; i++) {
      const entry = h[i];

      // Add current entry values
      output.vals.mean.push(Math.round(entry.mean * 100) / 100);
      output.vals.median.push(Math.round(entry.median * 100) / 100);
      output.vals.mode.push(Math.round(entry.mode * 100) / 100);
      output.vals.daily.push(entry.daily);
      output.vals.current.push(entry.current);
      output.keys.push(this.formatDate(entry.time));

      // Check if there are any missing entries between the current one and the next one
      if (i + 1 < h.length) {
        const nextEntry = h[i + 1];

        // Get dates
        const currentDate = new Date(entry.time);
        const nextDate = new Date(nextEntry.time);

        // Get difference in days between entries
        const timeDiff = Math.abs(nextDate.getTime() - currentDate.getTime());
        const diffDays = Math.floor(timeDiff / (1000 * 3600 * 24)) - 1;

        // Fill missing days with "No data" (if any)
        for (let j = 0; j < diffDays; j++) {
          output.vals.mean.push(0);
          output.vals.median.push(0);
          output.vals.mode.push(0);
          output.vals.daily.push(0);
          output.vals.current.push(0);
          output.keys.push(this.formatDate(this.incDate(currentDate, j + 1)));
        }
      }
    }

    // If entries are missing after the first entry, fill with "No data"
    if (data.daysMissingEnd && data.lastDate) {
      const date = new Date(data.lastDate);
      date.setDate(date.getDate() + 1);

      for (let i = 0; i < data.daysMissingEnd; i++) {
        output.vals.mean.push(0);
        output.vals.median.push(0);
        output.vals.mode.push(0);
        output.vals.daily.push(0);
        output.vals.current.push(0);
        output.keys.push(this.formatDate(this.incDate(date, i)));
      }
    }

    // Add current values
    if (il.active) {
      output.vals.mean.push(Math.round(il.mean * 100) / 100);
      output.vals.median.push(Math.round(il.median * 100) / 100);
      output.vals.mode.push(Math.round(il.mode * 100) / 100);
      output.vals.daily.push(il.daily);
      output.vals.current.push(il.current);
      output.keys.push('Now');
    }

    // Bloat using 'null's the amount of days that should not have a tooltip.
    // Or in other words the number of days left in the league
    if (data.startEmptyPadding) {
      for (let i = 0; i < data.startEmptyPadding; i++) {
        output.vals.mean.push(null);
        output.vals.median.push(null);
        output.vals.mode.push(null);
        output.vals.daily.push(null);
        output.vals.current.push(null);
        output.keys.push('');
      }
    }

    // Return generated data
    return output;
  }

  private calculateDates(il: ItemEntryLeague, h: ItemHistory[]): any {
    const msInDay = 86400000;
    const dates = {
      firstDate: null,
      lastDate: null,
      totalDays: null,
      elapsedDays: null,
      startDate: null,
      endDate: null,
      daysMissingStart: 0,
      daysMissingEnd: 0,
      startEmptyPadding: 0
    };

    // If there are any history entries for this league, find the first and last date
    if (h.length) {
      dates.firstDate = new Date(h[0].time);
      dates.lastDate = new Date(h[h.length - 1].time);
    }

    // League should always have a start date
    if (il.start) {
      dates.startDate = new Date(il.start);
    }

    // Permanent leagues don't have an end date
    if (il.end) {
      dates.endDate = new Date(il.end);
    }

    // Find duration for non-permanent leagues
    if (dates.startDate && dates.endDate) {
      dates.totalDays = Math.floor(Math.abs(dates.endDate.getTime() - dates.startDate.getTime()) / msInDay);

      if (il.active) {
        dates.elapsedDays = Math.floor(Math.abs(new Date().getTime() - dates.startDate.getTime()) / msInDay);
      } else {
        dates.elapsedDays = dates.totalDays;
      }
    }

    // Find how many days worth of data is missing from the league start
    if (il.id > 2) {
      if (dates.firstDate && dates.startDate) {
        dates.daysMissingStart = Math.floor(Math.abs(dates.firstDate.getTime() - dates.startDate.getTime()) / msInDay);
      }
    }

    // Find how many days worth of data is missing from the league end, if league has ended
    if (il.active) {
      // League is active, compare time of last entry to right now
      if (dates.lastDate) {
        dates.daysMissingEnd = Math.floor(Math.abs(new Date().getTime() - dates.lastDate.getTime()) / msInDay);
      }
    } else {
      // League has ended, compare time of last entry to time of league end
      if (dates.lastDate && dates.endDate) {
        dates.daysMissingEnd = Math.floor(Math.abs(dates.lastDate.getTime() - dates.endDate.getTime()) / msInDay);
      }
    }

    // Find number of ticks the graph should be padded with empty entries on the left
    if (il.id > 2) {
      if (dates.totalDays !== null && dates.elapsedDays !== null) {
        dates.startEmptyPadding = dates.totalDays - dates.elapsedDays;
      }
    } else {
      dates.startEmptyPadding = 120 - h.length;
    }

    return dates;
  }

  private formatDate(timeStamp: Date): string {
    const MONTH_NAMES = [
      'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
      'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ];

    const s = new Date(timeStamp);
    return `${s.getDate()} ${MONTH_NAMES[s.getMonth()]}`;
  }

  private incDate(date: Date, amount: number = 1) {
    const newDate = new Date(date.valueOf());
    newDate.setDate(newDate.getDate() + amount);
    return newDate;
  }
}
