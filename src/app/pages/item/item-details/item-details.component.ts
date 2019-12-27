import { Component, Input, OnInit } from '@angular/core';
import { ItemEntryLeague } from '../../../modules/api/item-entry';
import { Subject } from 'rxjs';
import { AppConstants } from '../../../app-constants';

@Component({
  selector: 'pw-item-details',
  templateUrl: './item-details.component.html',
  styleUrls: ['./item-details.component.css']
})
export class ItemDetailsComponent implements OnInit {
  @Input() entryLeague$: Subject<ItemEntryLeague>;
  public appConstants = AppConstants;

  constructor() {
  }

  ngOnInit() {
  }

}
