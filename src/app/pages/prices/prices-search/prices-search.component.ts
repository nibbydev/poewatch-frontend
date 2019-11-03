import {Component, OnInit} from '@angular/core';
import {InputType} from './search-option';
import {PriceFilterService} from '../../../services/price-filter.service';

@Component({
  selector: 'app-prices-search',
  templateUrl: './prices-search.component.html',
  styleUrls: ['./prices-search.component.css']
})
export class PricesSearchComponent implements OnInit {

  constructor(private priceFilterService: PriceFilterService) {
  }

  ngOnInit() {

  }

  public getInputTypes() {
    return InputType;
  }
}
