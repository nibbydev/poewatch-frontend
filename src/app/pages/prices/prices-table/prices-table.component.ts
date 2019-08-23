import { Component, Input, OnInit } from '@angular/core';
import { GetEntry } from '../../../services/data/get-entry';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-prices-table',
  templateUrl: './prices-table.component.html',
  styleUrls: ['./prices-table.component.css']
})
export class PricesTableComponent implements OnInit {
  @Input() private entries$: Observable<GetEntry[]>;
  private readonly itemNameOptions = {
    clickable: false,
    showImg: true,
    imgSize: 'sm'
  };
  private readonly sparkLineOptions = {
    width: 60,
    height: 30,
    yPad: 2,
    radius: 0.2
  };
  private readonly columns = [
    {
      sort: true,

    }
  ];

  private readonly chaosIcon = 'https://web.poecdn.com/image/Art/2DItems/Currency/CurrencyRerollRare.png?scale=1&amp;w=1&amp;h=1';
  private readonly exaltedIcon = 'https://web.poecdn.com/image/Art/2DItems/Currency/CurrencyAddModToRare.png?scale=1&amp;w=1&amp;h=1';

  constructor() {
  }

  ngOnInit() {
  }

}
