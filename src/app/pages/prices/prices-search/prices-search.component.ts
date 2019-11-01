import {Component, Input, OnInit} from '@angular/core';
import {InputType, SearchCriteria} from './search-option';

/*

TODO: This class is an absolute mess

*/

@Component({
  selector: 'app-prices-search',
  templateUrl: './prices-search.component.html',
  styleUrls: ['./prices-search.component.css']
})
export class PricesSearchComponent implements OnInit {
  public inputType = InputType;
  @Input() searchCriteria: SearchCriteria[];

  constructor() {
  }

  ngOnInit() {

  }

  getEnabledCriteria(): SearchCriteria[] {
    return this.searchCriteria.filter(c => c.enabled === true);
  }
}
