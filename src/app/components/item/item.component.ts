import { Component, Input, OnInit } from '@angular/core';
import { Rarity } from '../../modules/rarity';
import { ItemData } from '../../modules/api/item-data';

@Component({
  selector: 'pw-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {
  @Input() item: ItemData;
  @Input() clickable: boolean;
  @Input() showImg: boolean;
  @Input() size: 'xs' | 'sm' | 'md' | 'lg' | 'xl';

  constructor() {
  }

  ngOnInit() {
  }

  private getImgSizeClass(): string {
    return 'img-container-' + this.size;
  }

  public hasProperties(): boolean {
    if (this.item.variation) {
      return true;
    }

    if (this.item.mapTier) {
      return true;
    }

    if (this.item.influences.length) {
      return true;
    }

    if (this.item.baseItemLevel) {
      return true;
    }

    if (this.item.linkCount) {
      return true;
    }

    if (this.item.frame === Rarity.GEM) {
      return true;
    }

    return false;
  }

  private getSecondaryClasses() {
    return {
      'item-unique-secondary': this.item.frame === Rarity.UNIQUE,
      'item-foil-secondary': this.item.frame === Rarity.RELIC
    };
  }

  private getPrimaryClasses(): {} {
    return {
      'cursor-pointer': this.clickable,
      'item-unique': this.item.frame === Rarity.UNIQUE,
      'item-foil': this.item.frame === Rarity.RELIC,
      'item-prophecy': this.item.frame === Rarity.PROPHECY,
      'item-gem': this.item.frame === Rarity.GEM,
      'item-currency': this.item.frame === Rarity.CURRENCY,
      'item-shaper': 'shaper' in this.item.influences,
      'item-elder': 'elder' in this.item.influences,
      'text-lg': this.size === 'lg'
    };
  }

}
