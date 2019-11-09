import {Component, Input, OnInit} from '@angular/core';
import {GetEntry} from '../../shared/data/get-entry';
import {Rarity} from '../../shared/data/rarity';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {
  @Input() item: GetEntry;
  @Input() options = {
    clickable: false,
    showImg: true,
    imgSize: 'sm'
  };

  constructor() {
  }

  ngOnInit() {
    this.options.clickable = this.options.clickable || false;
    this.options.showImg = this.options.showImg || true;
    this.options.imgSize = this.options.imgSize || 'sm';

    if (!['xs', 'sm', 'md', 'lg', 'xl'].includes(this.options.imgSize)) {
      throw new Error(`Unknown size provided. Use one of Bootstrap' constraints`);
    }
  }

  private getImgSizeClass(): string {
    return 'img-container-' + this.options.imgSize;
  }

  private getPrimaryClasses(): any {
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

  private getName(): string {
    let name = this.item.name;

    // If item is enchantment, insert enchant values for display purposes
    if (this.item.category === 'enchantment') {
      // Min roll
      if (name.includes('#') && this.item.enchantMin !== null) {
        name = name.replace('#', this.item.enchantMin.toString());
      }

      // Max roll
      if (name.includes('#') && this.item.enchantMax !== null) {
        name = name.replace('#', this.item.enchantMax.toString());
      }
    }

    return name.trim();
  }

  private hasProperties(): boolean {
    return !!(this.item.variation
      || this.item.category === 'map' && this.item.mapTier
      || this.item.category === 'base' && (this.item.baseIsElder || this.item.baseIsElder)
      || this.item.baseItemLevel
      || this.item.linkCount
      || this.item.category === 'gem');
  }

  /**
   * Creates formatted properties for the item
   */
  private getProperties(): string {
    // Begin builder
    let builder = '';

    if (this.item.variation) {
      builder += this.item.variation + ', ';
    }

    if (this.item.category === 'map' && this.item.mapTier) {
      builder += 'tier ' + this.item.mapTier + ', ';
    }

    if (this.item.category === 'base') {
      if (this.item.baseIsShaper) {
        builder += 'shaper, ';
      } else if (this.item.baseIsElder) {
        builder += 'elder, ';
      }
    }

    if (this.item.baseItemLevel) {
      builder += 'iLvl ' + this.item.baseItemLevel + ', ';
    }

    if (this.item.linkCount) {
      builder += 'links ' + this.item.linkCount + ', ';
    }

    if (this.item.category === 'gem') {
      builder += 'level ' + this.item.gemLevel + ', ';
      builder += 'quality ' + this.item.gemQuality + ', ';

      if (this.item.gemIsCorrupted) {
        builder += 'corrupted, ';
      }
    }

    // If the item had properties, remove trailing comma+space and wrap in brackets
    if (builder) {
      builder = '(' + builder.substring(0, builder.length - 2) + ')';
    }

    return builder;
  }

  /**
   * Formats the icon
   */
  private getIcon(): string {
    // Use TLS for icons for that sweet, sweet secure site badge
    let icon = this.item.icon.replace('http://', 'https://');

    // If item is base
    if (this.item.category === 'base') {
      if (this.item.baseIsShaper) {
        icon += '&shaper=1';
      } else if (this.item.baseIsElder) {
        icon += '&elder=1';
      }
    }

    return icon;
  }
}
