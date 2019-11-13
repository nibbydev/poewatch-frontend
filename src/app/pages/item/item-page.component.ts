import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ItemService} from '../../services/item.service';
import {ItemEntry} from '../../shared/data/item-entry';
import {first} from 'rxjs/operators';
import {SearchCriteria, SearchOption} from '../../shared/data/search-criteria';
import {BehaviorSubject, Subject} from 'rxjs';
import {GetEntry} from '../../shared/data/get-entry';

@Component({
  selector: 'app-item-page',
  templateUrl: './item-page.component.html',
  styleUrls: ['./item-page.component.css']
})
export class ItemPageComponent implements OnInit {
  public item: ItemEntry;
  private id: number | undefined;
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
    showItem(e: GetEntry) {
      return true;
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
      this.item = i;
    });
  }

}
