import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ItemService } from '../../services/api/item.service';
import { ItemEntry, ItemEntryLeague } from '../../modules/api/item-entry';
import { first } from 'rxjs/operators';
import { Criteria, SearchOption } from '../../modules/criteria';
import { BehaviorSubject } from 'rxjs';
import { ItemHistoryService } from '../../services/api/item-history.service';
import { ChartResult, StatDefinition } from '../../modules/chart-result';
import { ItemHistoryUtil } from '../../utility/item-history-util';
import * as shape from 'd3-shape';

@Component({
  selector: 'pw-item-page',
  templateUrl: './item-page.component.html',
  styleUrls: ['./item-page.component.css']
})
export class ItemPageComponent implements OnInit {
  private readonly statDefinitionGroups = [
    {
      id: 'group_1',
      members: [
        {
          id: 'mean',
          display: 'Mean',
          description: 'The sum divided by the number of elements',
          unit: 'chaos',
          color: '#ffc459'
        },
        {
          id: 'median',
          display: 'Median',
          description: 'The center-most element (of a sorted list)',
          unit: 'chaos',
          color: '#f6ffa1'
        },
        {
          id: 'mode',
          display: 'Mode',
          description: 'The most common element in the list',
          unit: 'chaos',
          color: '#99ffa0'
        },
      ],
      results: [],
      curve: shape.curveMonotoneX
    },
    {
      id: 'group_2',
      members: [
        {
          id: 'daily',
          display: 'Listed daily',
          description: 'Items listed in the past 24h',
          unit: null,
          color: '#b2f3ff'
        },
        {
          id: 'current',
          display: 'Now',
          description: 'Items currently on sale',
          unit: null,
          color: '#ff94b3'
        },
      ],
      results: [],
      curve: shape.curveMonotoneX
    }
  ] as {
    id: string,
    members: StatDefinition[],
    results: ChartResult[],
    curve: shape
  }[];

  public item: ItemEntry;
  private entryLeague$: BehaviorSubject<ItemEntryLeague> = new BehaviorSubject(null);
  public id: number;
  private leagueCriteria: Criteria = {
    id: 'league',
    title: 'League',
    showTitle: false,
    inputType: 'dropdown',
    visible: true,
    disabled: false,
    value: null,
    defaultOptionIndex: 0,
    unsetDefaultQueryParam: false,
    setInitialQueryParam: true,
    showSpinner: true,
    options: new BehaviorSubject<SearchOption[]>(null),
    onChange: () => this.requestReloadChartData(),
    onReady: () => this.requestReloadChartData()
  };

  constructor(private activatedRoute: ActivatedRoute,
              private itemService: ItemService,
              private itemHistoryService: ItemHistoryService) {
  }

  ngOnInit() {
    const id = parseInt(this.activatedRoute.snapshot.queryParamMap.get('id'), 10);
    if (!isNaN(id)) {
      this.id = id;
      this.requestItem();
    }
  }

  private requestItem(): void {
    this.itemService.makeRequest(this.id).pipe(first()).subscribe(i => {
      this.item = i;

      // create search options from the item's leagues
      const options: SearchOption[] = i.leagues.map(l => {
        const display = l.display ? (l.active ? l.display : '> ' + l.display) : l.name;
        return {display, value: l.name};
      });

      // cast to BehaviorSubject and send the options so they'd appear in the selector
      (this.leagueCriteria.options as BehaviorSubject<SearchOption[]>).next(options);
    });
  }

  private requestReloadChartData(): void {
    const entryLeague = this.item.leagues.find(l => l.name === this.leagueCriteria.value);
    this.entryLeague$.next(entryLeague);

    this.itemHistoryService.makeRequest(this.id, entryLeague.name).pipe(first()).subscribe(h => {
      // todo: improve whatever the fuck this is supposed to be
      this.statDefinitionGroups.forEach(sdg => {
        sdg.results = ItemHistoryUtil.convert(entryLeague, h, sdg.members);
      });
    });
  }
}
