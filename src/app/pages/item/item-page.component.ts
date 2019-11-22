import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ItemService } from '../../services/item.service';
import { ItemEntry, ItemEntryLeague } from '../../shared/api/item-entry';
import { first } from 'rxjs/operators';
import { Criteria, SearchOption } from '../../shared/criteria';
import { BehaviorSubject, Observable } from 'rxjs';
import { ItemHistoryFormatPipe } from '../../pipes/item-history-format.pipe';
import { ItemHistoryService } from '../../services/item-hisotry.service';
import { ChartResult, ChartSeriesDef } from '../../shared/chart-result';

@Component({
  selector: 'app-item-page',
  templateUrl: './item-page.component.html',
  styleUrls: ['./item-page.component.css']
})
export class ItemPageComponent implements OnInit {
  public priceChartData = {
    seriesDef: [
      {
        name: 'mean',
        color: '#ffc459'
      },
      {
        name: 'median',
        color: '#f6ffa1'
      },
      {
        name: 'mode',
        color: '#99ffa0'
      }
    ] as ChartSeriesDef[],
    results: null as ChartResult[],
  };
  public countChartData = {
    seriesDef: [
      {
        name: 'daily',
        color: '#b2f3ff'
      },
      {
        name: 'current',
        color: '#ff94b3'
      }
    ] as ChartSeriesDef[],
    results: null as ChartResult[]
  };

  public item: ItemEntry;
  private entryLeague$: BehaviorSubject<ItemEntryLeague> = new BehaviorSubject(null);
  private id: number;
  private leagueCriteria: Criteria = {
    id: 'league',
    title: null,
    inputType: 'dropdown',
    visible: true,
    disabled: false,
    value: null,
    defaultOptionIndex: 0,
    setInitialQueryParam: true,
    showSpinner: true,
    options: new BehaviorSubject<SearchOption[]>(null),
    onChange: () => this.requestReloadChartData()
  };

  constructor(private activatedRoute: ActivatedRoute,
              private itemService: ItemService,
              private itemHistoryService: ItemHistoryService,
              private historyFormatPipe: ItemHistoryFormatPipe) {
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

      // set the initial values
      this.leagueCriteria.value = i.leagues[0].name;
      this.requestReloadChartData();
    });
  }

  private requestReloadChartData(): void {
    const entryLeague = this.item.leagues.find(l => l.name === this.leagueCriteria.value);
    this.entryLeague$.next(entryLeague);

    this.itemHistoryService.makeRequest(this.id, entryLeague.name).pipe(first()).subscribe(h => {
      console.log(h);
      this.priceChartData.results = this.historyFormatPipe.transform(entryLeague, h, this.priceChartData.seriesDef);
      this.countChartData.results = this.historyFormatPipe.transform(entryLeague, h, this.countChartData.seriesDef);
    });
  }
}
