export class ChartResults {
  name: string;
  series: ChartSeries[];
}

export class ChartSeries {
  name: Date;
  value: number;
  extra: ChartExtra;
}

export class ChartExtra {
  sequence: ChartSequence;
}

export enum ChartSequence {
  A,
  B,
  C,
  D,
  E,
  F
}
