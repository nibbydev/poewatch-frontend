import { Component, OnInit } from '@angular/core';
import { PricesService } from '../../services/prices.service';
import { PricesItem } from './prices-item';

@Component({
  selector: 'app-prices',
  templateUrl: './prices.component.html',
  styleUrls: ['./prices.component.css']
})
export class PricesComponent implements OnInit {
  private items: PricesItem[];

  constructor(private pricesService: PricesService) {
  }

  ngOnInit() {
    this.getPrices();
  }

  getPrices(): void {
    this.pricesService.getPrices(null, null).subscribe(prices => this.items = prices);
  }
}
