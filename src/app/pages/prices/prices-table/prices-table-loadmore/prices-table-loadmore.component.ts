import {Component, OnInit} from '@angular/core';
import {PricePaginationService} from '../../../../services/price-pagination.service';
import {PriceFilterService} from '../../../../services/price-filter.service';

@Component({
  selector: 'app-prices-table-loadmore',
  templateUrl: './prices-table-loadmore.component.html',
  styleUrls: ['./prices-table-loadmore.component.css']
})
export class PricesTableLoadmoreComponent implements OnInit {

  constructor(private priceFilterService: PriceFilterService,
              private paginationService: PricePaginationService) {
  }

  ngOnInit() {
  }

}
