export class SiteData {
  counts: {
    accounts: number;
    characters: number;
    items: number;
  };
  exalt: {
    id: number;
    mean: number;
    median: number;
  }[];
  leagues: number[];
  last: string;
}
