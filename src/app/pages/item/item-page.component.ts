import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ItemService} from '../../services/item.service';
import {ItemEntry, ItemEntryLeague} from '../../shared/data/item-entry';
import {first} from 'rxjs/operators';
import {SearchCriteria, SearchOption} from '../../shared/data/search-criteria';
import {BehaviorSubject, Observable, Subject} from 'rxjs';

@Component({
  selector: 'app-item-page',
  templateUrl: './item-page.component.html',
  styleUrls: ['./item-page.component.css']
})
export class ItemPageComponent implements OnInit {
  public item: ItemEntry;
  private id: number | undefined;
  private entryLeague$: Subject<ItemEntryLeague> = new Subject();

  private leagueCriteria: SearchCriteria = {
    id: 'league',
    title: null,
    inputType: 'dropdown',
    visible: true,
    disabled: false,
    value: null,
    defaultOptionIndex: 0,
    categories: null,
    reset: false,
    showSpinner: true,
    options: new BehaviorSubject<SearchOption[]>(null),
    showItem: null,
    onChange: () => {
      // find matching league and send it through
      const entryLeague = this.item.leagues.find(l => l.name === this.leagueCriteria.value);
      this.entryLeague$.next(entryLeague);
    }
  };
  private typeCriteria: SearchCriteria = {
    id: 'type',
    title: null,
    inputType: 'radio',
    visible: true,
    disabled: false,
    value: null,
    defaultOptionIndex: 0,
    categories: null,
    reset: false,
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
    showItem: null,
    onChange: () => {

    }
  };

  constructor(private activatedRoute: ActivatedRoute,
              private itemService: ItemService) {
  }

  ngOnInit() {
    this.id = parseInt(this.activatedRoute.snapshot.queryParamMap.get('id'), 10);
    if (isNaN(this.id)) {
      return;
    }

    this.itemService.makeRequest(this.id).pipe(first()).subscribe(i => {
      const options: SearchOption[] = i.leagues.map(l => {
        const display = l.display ? (l.active ? l.display : '> ' + l.display) : l.name;
        return {display, value: l.name};
      });

      (this.leagueCriteria.options as Subject<SearchOption[]>).next(options);
      this.leagueCriteria.value = options[0].value;
      this.entryLeague$.next(i.leagues[0]);
      this.item = i;
    });
  }

}
