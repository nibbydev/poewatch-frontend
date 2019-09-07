import { Injectable } from '@angular/core';
import {SidebarItem} from './data/sidebar-item';

@Injectable({
  providedIn: 'root'
})
export class SidebarProviderService {
  private elements: SidebarItem[] = [
    {
      display: 'Accessories',
      name: 'accessory',
      icon: 'https://web.poecdn.com/image/Art/2DItems/Amulets/YphethakksHeartUpgrade.png?scale=1&w=1&h=1',
      href: 'prices?category=accessory'
    },
    {
      display: 'Armour',
      name: 'armour',
      icon: 'https://web.poecdn.com/image/Art/2DItems/Armours/Gloves/AtzirisAcuity.png?scale=1&w=1&h=1',
      href: 'prices?category=armour'
    },
    {
      display: 'Bases',
      name: 'base',
      icon: 'https://web.poecdn.com/image/Art/2DItems/Rings/OpalRing.png?scale=1&w=1&h=1',
      href: 'prices?category=base'
    },
    {
      display: 'Currency',
      name: 'currency',
      icon: 'https://web.poecdn.com/image/Art/2DItems/Currency/CurrencyAddModToRare.png?scale=1&w=1&h=1',
      href: 'prices?category=currency'
    },
    {
      display: 'Div cards',
      name: 'card',
      icon: 'https://web.poecdn.com/image/Art/2DItems/Divination/InventoryIcon.png?scale=1&w=1&h=1',
      href: 'prices?category=card'
    },
    {
      display: 'Enchants',
      name: 'enchantment',
      icon: 'https://web.poecdn.com/image/Art/2DItems/Currency/Enchantment.png?scale=1&w=1&h=1',
      href: 'prices?category=enchantment'
    },
    {
      display: 'Flasks',
      name: 'flask',
      icon: 'https://web.poecdn.com/gen/image/WzksNCx7ImYiOiJBcnRcLzJESXRlbXNcL0ZsYXNrc1wvVGFzdGVPZkhhdGUiLCJzcCI6MC' +
        '42MDg1LCJsZXZlbCI6MH1d/fdc3742db8/Item.png',
      href: 'prices?category=flask'
    },
    {
      display: 'Gems',
      name: 'gem',
      icon: 'https://web.poecdn.com/image/Art/2DItems/Gems/Support/Enlighten.png?scale=1&w=1&h=1',
      href: 'prices?category=gem'
    },
    {
      display: 'Jewels',
      name: 'jewel',
      icon: 'https://web.poecdn.com/image/Art/2DItems/Jewels/GolemArctic.png?scale=1&w=1&h=1',
      href: 'prices?category=jewel'
    },
    {
      display: 'Maps',
      name: 'map',
      icon: 'https://web.poecdn.com/image/Art/2DItems/Maps/Atlas2Maps/New/BurialChambers.png?scale=1&w=1&h=1&mr=1&mn=1&mt=16',
      href: 'prices?category=map'
    },
    {
      display: 'Prophecy',
      name: 'prophecy',
      icon: 'https://web.poecdn.com/image/Art/2DItems/Currency/ProphecyOrbRed.png?scale=1&w=1&h=1',
      href: 'prices?category=prophecy'
    },
    {
      display: 'Weapons',
      name: 'weapon',
      icon: 'https://web.poecdn.com/image/Art/2DItems/Weapons/OneHandWeapons/Claws/TouchOfAnguish.png?scale=1&w=1&h=1',
      href: 'prices?category=weapon'
    }
  ];

  public getElements(): SidebarItem[] {
    return this.elements;
  }

  constructor() { }
}
