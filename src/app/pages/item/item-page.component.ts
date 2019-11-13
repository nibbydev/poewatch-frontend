import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ItemService} from '../../services/item.service';
import {ItemEntry, ItemEntryLeague} from '../../shared/data/item-entry';
import {first} from 'rxjs/operators';
import {SearchCriteria, SearchOption} from '../../shared/data/search-criteria';
import {BehaviorSubject, Subject} from 'rxjs';

@Component({
  selector: 'app-item-page',
  templateUrl: './item-page.component.html',
  styleUrls: ['./item-page.component.css']
})
export class ItemPageComponent implements OnInit {
  public item: ItemEntry;
  private id: number | undefined;
  private entryLeague$: Subject<ItemEntryLeague> = new Subject();
  private criteria: SearchCriteria = {
    id: 'league',
    title: null,
    inputType: 'dropdown',
    visible: false,
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
      const entryLeague = this.item.leagues.find(l => l.name === this.criteria.value);
      this.entryLeague$.next(entryLeague);
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


      (this.criteria.options as Subject<SearchOption[]>).next(options);
      this.criteria.value = options[0].value;
      this.entryLeague$.next(i.leagues[0]);
      this.item = i;
    });
  }

}
