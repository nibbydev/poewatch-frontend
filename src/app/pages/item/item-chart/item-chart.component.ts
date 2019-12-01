import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {ChartResult, ChartSeries, StatDefinition} from '../../../modules/chart-result';
import {Subject, Subscription} from 'rxjs';
import {ItemEntryLeague} from '../../../modules/api/item-entry';
import {DateUtilConst, DateUtilFunc} from '../../../utility/date-util';
import * as shape from 'd3-shape';

@Component({
  selector: 'pw-item-chart',
  templateUrl: './item-chart.component.html',
  styleUrls: ['./item-chart.component.css']
})
export class ItemChartComponent implements OnInit, OnDestroy {
  @Input() entryLeague$: Subject<ItemEntryLeague>;
  @Input() results: ChartResult[];
  @Input() definitions: StatDefinition[];
  @Input() curve = shape.curveMonotoneX;

  public colorScheme: { domain: string[] };
  private leagueSubscription: Subscription;
  private entryLeague: ItemEntryLeague = null;

  constructor() {
  }

  ngOnInit() {
    this.colorScheme = {domain: this.definitions.map(s => s.color)};
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
      case 0:
        return 'Missing for league start';
      case 2:
        return 'Missing data for this day';
      case 3:
        return 'Missing data for league end';
      case 5:
        return 'League has not progressed this far yet';
    }
  }

  public isDefaultSequence(entries: ChartSeries[]): boolean {
    return entries[0].extra.sequence === 1 || entries[0].extra.sequence === 4;
  }

  public getTimestampSubTexts(name: string): string[] {
    if (!this.entryLeague) {
      return [];
    }

    const date = new Date(name);
    const messages = [];
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    const startDate = DateUtilFunc.roundToDays(new Date(this.entryLeague.start));
    if (date.getTime() === startDate.getTime()) {
      messages.push('League start');
    }

    const endDate = DateUtilFunc.roundToDays(new Date(this.entryLeague.end));
    if (endDate.getTime() === date.getTime()) {
      messages.push('League end');
    }

    const dayNumber = Math.ceil((date.getTime() - startDate.getTime() + 1) / DateUtilConst.msInDay);
    const weekNumber = Math.ceil(dayNumber / 7);

    messages.push('Week ' + weekNumber + ', Day ' + dayNumber);
    messages.push(days[date.getDay()]);

    return messages;
  }

}

