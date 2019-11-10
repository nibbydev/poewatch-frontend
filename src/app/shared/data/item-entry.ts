import {ItemData} from './item-data';

export class ItemEntry extends ItemData {
  public leagues: ItemEntryLeague[];
}

export class ItemEntryLeague {
  public id: number;
  public name: string;
  public display?: string;
  public active: boolean;
  public start?: string;
  public end?: string;

  public mean: number;
  public median: number;
  public mode: number;
  public min: number;
  public max: number;
  public exalted: number;

  public total: number;
  public daily: number;
  public current: number;
  public accepted: number;
}
