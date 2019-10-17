import { ItemData } from './item-data';

export class GetEntry extends ItemData {
  mean: number;
  median: number;
  mode: number;
  min: number;
  max: number;
  exalted: number;
  total: number;
  daily: number;
  current: number;
  accepted: number;

  change: number;
  history: number[];
}
