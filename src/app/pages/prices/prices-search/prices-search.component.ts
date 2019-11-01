import {Component, Input, OnInit} from '@angular/core';
import {InputType, SearchCriteria} from './search-option';

@Component({
  selector: 'app-prices-search',
  templateUrl: './prices-search.component.html',
  styleUrls: ['./prices-search.component.css']
})
export class PricesSearchComponent implements OnInit {
  @Input() searchCriteria: SearchCriteria[];

  constructor() {
  }

  ngOnInit() {

  }

  getEnabledCriteria(): SearchCriteria[] {
    return this.searchCriteria.filter(c => c.enabled === true);
  }

  public getInputTypes() {
    return InputType;
  }
}
