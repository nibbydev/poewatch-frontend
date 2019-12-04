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

  public tableColumnHeaders = [
    {
      fullWidth: true,
      display: 'Item',
      tooltip: 'Item picture, name, rarity and extras',
      hideOnMd: false,
      sort: true,
      sortKey: 'item',
    },
    {
      fullWidth: false,
      display: 'Price',
      tooltip: 'Price in Chaos and Exalted Orbs',
      hideOnMd: false,
      sort: true,
      sortKey: 'price',
    },
    {
      fullWidth: false,
      display: 'Change',
      tooltip: 'Price compared to 7d ago',
      hideOnMd: false,
      sort: true,
      sortKey: 'change',
    },
    {
      fullWidth: false,
      display: 'Now',
      tooltip: 'Number of items currently on sale',
      hideOnMd: false,
      sort: true,
      sortKey: 'now',
    },
    {
      fullWidth: false,
      display: 'Daily',
      tooltip: 'Number of items listed every 24h',
      hideOnMd: false,
      sort: true,
      sortKey: 'daily',
    },
    {
      fullWidth: false,
      display: 'Total',
      tooltip: 'Total number of items listed',
      hideOnMd: false,
      sort: true,
      sortKey: 'total',
    },
  ];

  constructor(private priceFilterService: PriceFilterService) {
  }

  ngOnInit() {
    this.subscription$ = this.priceFilterService.getEntries().subscribe(entries => this.entries = entries);
  }

  ngOnDestroy(): void {
    this.subscription$.unsubscribe();
  }

  public stateChange(column: string, state: string) {
    console.log(column, state);
    this.priceFilterService.sortEntries();
  }
}
