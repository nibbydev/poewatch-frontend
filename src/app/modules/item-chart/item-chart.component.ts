import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {ChartResult, ChartSequence, ChartSeries, ChartSeriesDef} from '../../shared/chart-result';
import {Subject, Subscription} from 'rxjs';
import {ItemEntryLeague} from '../../shared/api/item-entry';
import {DateUtil} from '../../shared/utility/date-util';

@Component({
  selector: 'app-item-chart',
  templateUrl: './item-chart.component.html',
  styleUrls: ['./item-chart.component.css']
})
export class ItemChartComponent implements OnInit, OnDestroy {
  @Input() entryLeague$: Subject<ItemEntryLeague>;
  @Input() data: {
    results: ChartResult[],
    seriesDef: ChartSeriesDef[]
  };

  public colorScheme: { domain: string[] };
  public printOut = console.log; // todo: remove me
  private leagueSubscription: Subscription;
  private entryLeague: ItemEntryLeague = null;

  constructor() {
  }

  ngOnInit() {
    this.colorScheme = {domain: this.data.seriesDef.map(s => s.color)};
    this.leagueSubscription = this.entryLeague$.subscribe(e => this.entryLeague = e);
  }

  ngOnDestroy() {
    if (this.leagueSubscription) {
      this.leagueSubscription.unsubscribe();
    }
  }

  /**
   * Hides X-axis ticks
   */
  public emptyTickFormatting = () => '';

  public getSequenceWarning(entries: ChartSeries[]): string {
    switch (entries[0].extra.sequence) {
      case ChartSequence.LeftPad:
        return 'Missing for league start';
      case ChartSequence.CenterFill:
        return 'Missing data for this day';
      case ChartSequence.RightPad:
        return 'Missing data for league end';
      case ChartSequence.EmptyPad:
        return 'League has not progressed this far yet';
    }
  }

  public isDefaultSequence(entries: ChartSeries[]): boolean {
    return entries[0].extra.sequence === ChartSequence.Default
      || entries[0].extra.sequence === ChartSequence.Current;
  }

  public getTimestampSubTexts(date: Date): string[] {
    if (!this.entryLeague) {
      return [];
    }

    const messages = [];
    const fourHours = 14400000;
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    console.log(DateUtil.roundDate(date).toISOString(), DateUtil.roundDate(new Date(this.entryLeague.start)).toISOString());

    const startDate = DateUtil.roundDate(new Date(this.entryLeague.start));
    if (date.getTime() - startDate.getTime() < fourHours) {
      messages.push('League start');
    }

    const endDate = DateUtil.roundDate(new Date(this.entryLeague.end));
    if (endDate.getTime() - date.getTime() < fourHours) {
      messages.push('League end');
    }

    const dayNumber = Math.ceil((date.getTime() - startDate.getTime() + 1) / 86400000);
    const weekNumber = Math.ceil(dayNumber / 7);

    messages.push('Week ' + weekNumber + ', Day ' + dayNumber);
    messages.push(days[date.getDay()]);

    return messages;
  }

}

