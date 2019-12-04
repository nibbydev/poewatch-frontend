import { Component, OnDestroy, OnInit } from '@angular/core';
import { GetEntry } from '../../../modules/api/get-entry';
import { PriceFilterService } from '../../../services/price-filter.service';
import { Subscription } from 'rxjs';
import { AppConstants } from '../../../app-constants';

@Component({
  selector: 'pw-prices-table',
  templateUrl: './prices-table.component.html',
  styleUrls: ['./prices-table.component.css']
})
export class PricesTableComponent implements OnInit, OnDestroy {
  public entries: GetEntry[];
  private subscription$: Subscription;
  private appConstants = AppConstants;

  constructor(private priceFilterService: PriceFilterService) {
  }

  ngOnInit() {
    this.subscription$ = this.priceFilterService.getEntries().subscribe(entries => this.entries = entries);
  }

  ngOnDestroy(): void {
    this.subscription$.unsubscribe();
  }

  public sortBy(a): void {
    console.log(a);
    this.priceFilterService.sortEntries();
  }
}
