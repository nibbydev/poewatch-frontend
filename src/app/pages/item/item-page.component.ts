import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ItemService} from '../../services/item.service';
import {ItemEntry, ItemEntryLeague} from '../../shared/data/item-entry';
import {first} from 'rxjs/operators';
import {Criteria, SearchOption} from '../../shared/data/criteria';
import {BehaviorSubject, Observable} from 'rxjs';
import {ItemHistoryFormatPipe} from '../../pipes/item-history-format.pipe';
import {ItemHistoryService} from '../../services/item-hisotry.service';

@Component({
  selector: 'app-item-page',
  templateUrl: './item-page.component.html',
  styleUrls: ['./item-page.component.css']
})
export class ItemPageComponent implements OnInit {
  private entryLeague$: BehaviorSubject<ItemEntryLeague> = new BehaviorSubject(null);
  private id: number;
  public item: ItemEntry;

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
    onChange: () => {
      this.onLeagueChange();
    }
  };
  private typeCriteria: Criteria = {
    id: 'type',
    title: null,
    inputType: 'radio',
    visible: true,
    disabled: false,
    value: null,
    defaultOptionIndex: 0,
    setInitialQueryParam: false,
    showSpinner: true,
    options: new Observable<SearchOption[]>(o => {
      o.next([
        {
          display: 'Price',
          value: 'price'
        }, {
          display: 'Count',
          value: 'count'
        }
      ]);
      o.complete();
    }),
    onChange: () => {
      // todo
    }
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
      this.onLeagueChange();
    });
  }

  private onLeagueChange(): void {
    const entryLeague = this.item.leagues.find(l => l.name === this.leagueCriteria.value);
    this.entryLeague$.next(entryLeague);

    this.itemHistoryService.makeRequest(this.id, entryLeague.name).pipe(first()).subscribe(h => {
      // todo
      console.log(h);
      console.log(this.historyFormatPipe.formatHistory(entryLeague, h));
    });
  }
}
