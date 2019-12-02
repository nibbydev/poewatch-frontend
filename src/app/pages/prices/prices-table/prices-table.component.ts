import { Component, OnDestroy, OnInit } from '@angular/core';
import { GetEntry } from '../../../modules/api/get-entry';
import { PriceFilterService } from '../../../services/price-filter.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'pw-prices-table',
  templateUrl: './prices-table.component.html',
  styleUrls: ['./prices-table.component.css']
})
export class PricesTableComponent implements OnInit, OnDestroy {
  public entries: GetEntry[];
  private subscription$: Subscription;

  private readonly chaosIcon = 'https://web.poecdn.com/image/Art/2DItems/Currency/CurrencyRerollRare.png?scale=1&amp;w=1&amp;h=1';
  private readonly exaltedIcon = 'https://web.poecdn.com/image/Art/2DItems/Currency/CurrencyAddModToRare.png?scale=1&amp;w=1&amp;h=1';

  constructor(private priceFilterService: PriceFilterService) {
  }

  ngOnInit() {
    this.subscription$ = this.priceFilterService.getEntries().subscribe(entries => this.entries = entries);
  }

  ngOnDestroy(): void {
    this.subscription$.unsubscribe();
  }
}
