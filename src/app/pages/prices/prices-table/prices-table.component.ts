import { Component, OnDestroy, OnInit } from '@angular/core';
import { GetEntry } from '../../../modules/api/get-entry';
import { PriceFilterService } from '../../../services/price-filter.service';
import { Subscription } from 'rxjs';
import { AppConstants } from '../../../app-constants';
import { scaleLinear } from 'd3-scale';

@Component({
  selector: 'pw-prices-table',
  templateUrl: './prices-table.component.html',
  styleUrls: ['./prices-table.component.css']
})
export class PricesTableComponent implements OnInit, OnDestroy {
  public readonly color = scaleLinear().domain([-100, 100]).range(['#ff857e', '#9cff87']);
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
      colspan: 1
    },
    {
      fullWidth: false,
      display: 'Price',
      tooltip: 'Price in Chaos and Exalted Orbs',
      hideOnMd: false,
      sort: true,
      sortKey: 'price',
      colspan: 1
    },
    {
      fullWidth: false,
      display: 'Change',
      tooltip: 'Price compared to 7d ago',
      hideOnMd: false,
      sort: true,
      sortKey: 'change',
      colspan: 2
    },
    {
      fullWidth: false,
      display: 'Now',
      tooltip: 'Number of items currently on sale',
      hideOnMd: false,
      sort: true,
      sortKey: 'now',
      colspan: 1
    },
    {
      fullWidth: false,
      display: 'Daily',
      tooltip: 'Number of items listed every 24h',
      hideOnMd: false,
      sort: true,
      sortKey: 'daily',
      colspan: 1
    },
    {
      fullWidth: false,
      display: 'Total',
      tooltip: 'Total number of items listed',
      hideOnMd: false,
      sort: true,
      sortKey: 'total',
      colspan: 1
    }
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
    // todo: me
    this.priceFilterService.sortEntries();
  }
}
