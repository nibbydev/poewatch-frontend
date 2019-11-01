import {Component, OnInit} from '@angular/core';
import {InputType} from './search-option';
import {PriceSearchService} from '../../../services/price-search.service';

@Component({
  selector: 'app-prices-search',
  templateUrl: './prices-search.component.html',
  styleUrls: ['./prices-search.component.css']
})
export class PricesSearchComponent implements OnInit {

  constructor(private priceSearchService: PriceSearchService) {
  }

  ngOnInit() {

  }

  public getInputTypes() {
    return InputType;
  }
}
