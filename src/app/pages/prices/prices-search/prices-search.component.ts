import {Component, Input, OnInit} from '@angular/core';
import {InputType, SearchCriteria} from './search-option';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-prices-search',
  templateUrl: './prices-search.component.html',
  styleUrls: ['./prices-search.component.css']
})
export class PricesSearchComponent implements OnInit {
  @Input() searchCriteria$: Observable<SearchCriteria[]>;

  constructor() {
  }

  ngOnInit() {

  }

  getEnabledCriteria(): Observable<SearchCriteria[]> {
    return new Observable(t => {
      this.searchCriteria$.subscribe(searchCriteria => {
        t.next(searchCriteria.filter(c => c.enabled === true));
      });
    });
  }

  public getInputTypes() {
    return InputType;
  }
}
