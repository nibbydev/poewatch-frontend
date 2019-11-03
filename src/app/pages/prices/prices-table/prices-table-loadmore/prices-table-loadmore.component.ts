import {Component, OnInit} from '@angular/core';
import {PriceSearchService} from '../../../../services/price-search.service';

@Component({
  selector: 'app-prices-table-loadmore',
  templateUrl: './prices-table-loadmore.component.html',
  styleUrls: ['./prices-table-loadmore.component.css']
})
export class PricesTableLoadmoreComponent implements OnInit {

  constructor(private priceSearchService: PriceSearchService) {
  }

  ngOnInit() {
  }

  private onClick() {

  }

}
