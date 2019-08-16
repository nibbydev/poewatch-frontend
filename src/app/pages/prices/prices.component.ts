import { Component, OnInit } from '@angular/core';
import { PriceService } from '../../services/price.service';

@Component({
  selector: 'app-prices',
  templateUrl: './prices.component.html',
  styleUrls: ['./prices.component.css']
})
export class PricesComponent implements OnInit {
  constructor(private pricesService: PriceService) {
  }

  ngOnInit() {
    this.pricesService.get('standard', 'jewel');
  }
}
