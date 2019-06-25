export class PricesItem {
  id: number;
  name: string;
  type?: string;
  category: string;
  group: string;
  frame: number;
  mapSeries?: number;
  mapTier?: number;
  baseIsShaper?: boolean;
  baseIsElder?: boolean;
  baseItemLevel?: number;
  gemQuality?: number;
  gemLevel?: number;
  gemInCorrupted?: boolean;
  enchantMin?: number;
  enchantMax?: number;
  stackSize?: number;
  linkCount?: number;
  variation?: number;
  icon: string;

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
