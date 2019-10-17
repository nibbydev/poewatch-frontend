export class ItemData {
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
  gemIsCorrupted?: boolean;
  enchantMin?: number;
  enchantMax?: number;
  stackSize?: number;
  linkCount?: number;
  variation?: number;
  icon: string;
}
