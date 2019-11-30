import {Pipe, PipeTransform} from '@angular/core';
import {ItemData} from '../modules/api/item-data';

@Pipe({
  name: 'itemFormat'
})
export class ItemFormatPipe implements PipeTransform {

  transform(item: ItemData, type: 'name' | 'icon' | 'properties'): any {
    switch (type) {
      case 'name':
        return this.formatName(item);
      case 'icon':
        return this.formatIcon(item);
      case 'properties':
        return this.formatProperties(item);
    }
  }

  private formatIcon(item: ItemData): string {
    // Use TLS for icons for that sweet, sweet secure site badge
    let icon = item.icon.replace('http://', 'https://');

    // If item is base
    if (item.category === 'base') {
      if (item.baseIsShaper) {
        icon += '&shaper=1';
      } else if (item.baseIsElder) {
        icon += '&elder=1';
      }
    }

    return icon;
  }

  private formatProperties(item: ItemData): string {
    // Begin builder
    let builder = '';

    if (item.variation) {
      builder += item.variation + ', ';
    }

    if (item.category === 'map' && item.mapTier) {
      builder += 'tier ' + item.mapTier + ', ';
    }

    if (item.category === 'base') {
      if (item.baseIsShaper) {
        builder += 'shaper, ';
      } else if (item.baseIsElder) {
        builder += 'elder, ';
      }
    }

    if (item.baseItemLevel) {
      builder += 'iLvl ' + item.baseItemLevel + ', ';
    }

    if (item.linkCount) {
      builder += 'links ' + item.linkCount + ', ';
    }

    if (item.category === 'gem') {
      builder += 'level ' + item.gemLevel + ', ';
      builder += 'quality ' + item.gemQuality + ', ';

      if (item.gemIsCorrupted) {
        builder += 'corrupted, ';
      }
    }

    // If the item had properties, remove trailing comma+space and wrap in brackets
    if (builder) {
      builder = '(' + builder.substring(0, builder.length - 2) + ')';
    }

    return builder;
  }

  private formatName(item: ItemData): string {
    let name = item.name;

    // If item is enchantment, insert enchant values for display purposes
    if (item.category === 'enchantment') {
      // Min roll
      if (name.includes('#') && item.enchantMin !== null) {
        name = name.replace('#', item.enchantMin.toString());
      }

      // Max roll
      if (name.includes('#') && item.enchantMax !== null) {
        name = name.replace('#', item.enchantMax.toString());
      }
    }

    return name.trim();
  }

}
