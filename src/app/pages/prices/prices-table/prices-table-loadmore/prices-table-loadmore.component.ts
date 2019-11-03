import {Component, OnInit} from '@angular/core';
import {PriceFilterService} from '../../../../services/price-filter.service';

@Component({
  selector: 'app-prices-table-loadmore',
  templateUrl: './prices-table-loadmore.component.html',
  styleUrls: ['./prices-table-loadmore.component.css']
})
export class PricesTableLoadmoreComponent implements OnInit {

  constructor(private priceFilterService: PriceFilterService) {
  }

  ngOnInit() {
  }

  private onClick() {

  }

}
