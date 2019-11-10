import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ItemService} from '../../services/item.service';
import {ItemEntry} from '../../shared/data/item-entry';
import {first} from "rxjs/operators";

@Component({
  selector: 'app-item-page',
  templateUrl: './item-page.component.html',
  styleUrls: ['./item-page.component.css']
})
export class ItemPageComponent implements OnInit {
  public item: ItemEntry;
  private id: number | undefined;
  private readonly itemOptions = {
    clickable: false,
    showImg: true,
    imgSize: 'lg'
  };

  constructor(private activatedRoute: ActivatedRoute,
              private itemService: ItemService) {
  }

  ngOnInit() {
    this.id = parseInt(this.activatedRoute.snapshot.queryParamMap.get('id'), 10);
    if (isNaN(this.id)) {
      this.id = undefined;
    }

    if (this.id) {
      this.itemService.makeRequest(this.id).pipe(first()).subscribe(i => this.item = i);
    }
  }

}
