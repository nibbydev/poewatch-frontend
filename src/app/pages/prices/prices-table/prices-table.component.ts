import {Component, OnInit} from '@angular/core';
import {PriceService} from '../../../services/price.service';
import {GetEntry} from '../../../services/data/get-entry';

@Component({
  selector: 'app-prices-table',
  templateUrl: './prices-table.component.html',
  styleUrls: ['./prices-table.component.css']
})
export class PricesTableComponent implements OnInit {
  public entries: GetEntry[];
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


  private readonly chaosIcon = 'https://web.poecdn.com/image/Art/2DItems/Currency/CurrencyRerollRare.png?scale=1&amp;w=1&amp;h=1';
  private readonly exaltedIcon = 'https://web.poecdn.com/image/Art/2DItems/Currency/CurrencyAddModToRare.png?scale=1&amp;w=1&amp;h=1';

  constructor(private priceService: PriceService) {
  }

  ngOnInit() {
    this.priceService.getEntries().subscribe(entries => this.entries = entries);
  }
}
