import {Component, OnInit} from '@angular/core';
import {GetEntry} from '../../../modules/api/get-entry';
import {PriceFilterService} from '../../../services/price-filter.service';
import {ChartResult} from '../../../modules/chart-result';

@Component({
  selector: 'pw-prices-table',
  templateUrl: './prices-table.component.html',
  styleUrls: ['./prices-table.component.css']
})
export class PricesTableComponent implements OnInit {
  public entries: GetEntry[];
  private readonly sparkLineOptions = {
    width: 60,
    height: 30,
    yPad: 2,
    radius: 0.2
  };

  results: ChartResult[] = [
    {
      name: 'Germany',
      color: '#ffb2f9',
      series: [
        {
          name: '2000',
          value: 40632,
          extra: undefined
        },
        {
          name: '2001',
          value: 36953,
          extra: undefined
        },
        {
          name: '2002',
          value: 31476,
          extra: undefined
        },
        {
          name: '2003',
          value: 0,
          extra: undefined
        },
        {
          name: '2004',
          value: 45986,
          extra: undefined
        },
        {
          name: '2005',
          value: 37060,
          extra: undefined
        },
        {
          name: '2006',
          value: 36745,
          extra: undefined
        },
        {
          name: '2007',
          value: 34774,
          extra: undefined
        },
        {
          name: '2008',
          value: 29476,
          extra: undefined
        },
        {
          name: '2009',
          value: 36240,
          extra: undefined
        },
        {
          name: '2010',
          value: 32543,
          extra: undefined
        },
        {
          name: '2011',
          value: 26424,
          extra: undefined
        }
      ]
    }
  ];

  public colorScheme: { domain: string[] } = {domain: ['#c0dd68', '#1ddd7f']};


  private readonly chaosIcon = 'https://web.poecdn.com/image/Art/2DItems/Currency/CurrencyRerollRare.png?scale=1&amp;w=1&amp;h=1';
  private readonly exaltedIcon = 'https://web.poecdn.com/image/Art/2DItems/Currency/CurrencyAddModToRare.png?scale=1&amp;w=1&amp;h=1';

  constructor(private priceFilterService: PriceFilterService) {
  }

  ngOnInit() {
    this.priceFilterService.getEntries().subscribe(entries => this.entries = entries);
  }
}
