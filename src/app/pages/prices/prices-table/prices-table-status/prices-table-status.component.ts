import {Component, OnInit} from '@angular/core';
import {PriceFilterService} from '../../../../services/price-filter.service';
import {PricePaginationService} from '../../../../services/price-pagination.service';

@Component({
  selector: 'pw-prices-table-status',
  templateUrl: './prices-table-status.component.html',
  styleUrls: ['./prices-table-status.component.css']
})
export class PricesTableStatusComponent implements OnInit {

  constructor(private priceFilterService: PriceFilterService,
              private paginationService: PricePaginationService) {
  }

  ngOnInit() {
  }

}
