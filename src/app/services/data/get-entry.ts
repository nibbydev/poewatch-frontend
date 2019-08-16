import { ItemdataEntry } from './itemdata-entry';

export class GetEntry extends ItemdataEntry {
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
