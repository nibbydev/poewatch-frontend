import {Component, Input, OnInit} from '@angular/core';
import {Rarity} from '../../shared/rarity';
import {ItemData} from '../../shared/api/item-data';

@Component({
  selector: 'pw-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {
  @Input() item: ItemData;
  @Input() options: {
    clickable: boolean,
    showImg: boolean,
    imgSize: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  };

  constructor() {
  }

  ngOnInit() {
  }

  private getImgSizeClass(): string {
    return 'img-container-' + this.options.imgSize;
  }

  private getPrimaryClasses(): {} {
    return {
      'cursor-pointer': this.options.clickable,
      'item-unique': this.item.frame === Rarity.UNIQUE,
      'item-foil': this.item.frame === Rarity.RELIC,
      'item-prophecy': this.item.frame === Rarity.PROPHECY,
      'item-gem': this.item.frame === Rarity.GEM,
      'item-currency': this.item.frame === Rarity.CURRENCY,
      'item-shaper': this.item.baseIsShaper,
      'item-elder': this.item.baseIsElder,
    };
  }

  private getSecondaryClasses() {
    return {
      'item-unique-secondary': this.item.frame === Rarity.UNIQUE,
      'item-foil-secondary': this.item.frame === Rarity.RELIC
    };
  }

  private hasProperties(): boolean {
    if (this.item.variation) {
      return true;
    }

    if (this.item.mapTier) {
      return true;
    }

    if (this.item.baseIsElder || this.item.baseIsElder) {
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

}
