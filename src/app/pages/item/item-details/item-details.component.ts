import {Component, Input, OnInit} from '@angular/core';
import {ItemEntryLeague} from '../../../shared/data/item-entry';
import {Subject} from 'rxjs';

@Component({
  selector: 'app-item-details',
  templateUrl: './item-details.component.html',
  styleUrls: ['./item-details.component.css']
})
export class ItemDetailsComponent implements OnInit {
  @Input() entryLeague$: Subject<ItemEntryLeague>;

  constructor() {
  }

  ngOnInit() {
  }

}
