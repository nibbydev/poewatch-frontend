import { Rarity } from '../rarity';

export class ItemData {
  id: number;
  name: string;
  type?: string;
  category: string;
  group: string;
  frame: Rarity;
  mapSeries?: number;
  mapTier?: number;
  influences: string[];
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
