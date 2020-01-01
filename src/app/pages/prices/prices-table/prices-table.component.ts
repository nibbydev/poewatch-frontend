import { Component, OnDestroy, OnInit } from '@angular/core';
import { GetEntry } from '../../../modules/api/get-entry';
import { PriceFilterService } from '../../../services/price-filter.service';
import { Subject, Subscription } from 'rxjs';
import { AppConstants } from '../../../app-constants';
import { scaleLinear } from 'd3-scale';
import { SortArrowState } from '../../../modules/sort-arrow-state';

@Component({
  selector: 'pw-prices-table',
  templateUrl: './prices-table.component.html',
  styleUrls: ['./prices-table.component.css']
})
export class PricesTableComponent implements OnInit, OnDestroy {
  public readonly changeColor = scaleLinear().domain([-100, 100]).range(['#ff857e', '#9cff87']);
  public readonly dailyColor = scaleLinear().domain([0, 200]).range(['#ff857e', '#9cff87']);
  public entries: GetEntry[];
  private subscription$: Subscription;
  private appConstants = AppConstants;
  private readonly resetSortArrows: Subject<string> = new Subject();

  public tableColumnHeaders = [
    {
      fullWidth: true,
      display: 'Item',
      tooltip: 'Item picture, name, rarity and extras',
      hideOnMd: false,
      isSortable: true,
      sortKey: 'name',
      colspan: 1
    },
    {
      fullWidth: false,
      display: 'Price',
      tooltip: 'Price in Chaos and Exalted Orbs',
      hideOnMd: false,
      isSortable: true,
      sortKey: 'mean',
      colspan: 1
    },
    {
      fullWidth: false,
      display: 'Change',
      tooltip: 'Price compared to 7d ago',
      hideOnMd: false,
      isSortable: true,
      sortKey: 'change',
      colspan: 2
    },
    {
      fullWidth: false,
      display: 'Now',
      tooltip: 'Number of items currently on sale',
      hideOnMd: false,
      isSortable: true,
      sortKey: 'current',
      colspan: 1
    },
    {
      fullWidth: false,
      display: 'Daily',
      tooltip: 'Number of items listed every 24h',
      hideOnMd: false,
      isSortable: true,
      sortKey: 'daily',
      colspan: 1
    },
    {
      fullWidth: false,
      display: 'Total',
      tooltip: 'Total number of items listed',
      hideOnMd: false,
      isSortable: true,
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

  public stateChange(e: { id: string, state: SortArrowState }) {
    this.resetSortArrows.next(e.id);
    this.priceFilterService.setSortParams(e);
    this.priceFilterService.sortEntries();
  }

  // public getConfidence(e: GetEntry) {
  //   let confidence = 0;
  //
  //   if (e.daily > 200) {
  //     confidence += 10;
  //   }
  //   if (e.daily > 50) {
  //     confidence += 5;
  //   }
  //   if (e.daily > 10) {
  //     confidence += 2;
  //   }
  //
  //   // todo: find a decent confidence algorithm
  //   // const diff1 = Math.abs(e.mean - e.median);
  //   // const diff2 = Math.abs(e.mode - e.median);
  //   // const diff3 = Math.abs(e.mean - e.mode);
  //
  //   return this.confidenceColor(confidence);
  // }

  public capDaily(item: GetEntry): number {
    return item.daily > 200 ? 200 : item.daily;
  }
}
