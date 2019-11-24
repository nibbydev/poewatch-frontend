export class ChartResult {
  name: string;
  series: ChartSeries[];
  color: string;
}

export class ChartSeries {
  name: Date;
  value: number;
  extra: ChartExtra;
}

export class ChartExtra {
  sequence: ChartSequence;
  color: string;
}

export enum ChartSequence {
  LeftPad,
  Default,
  CenterFill,
  RightPad,
  Current,
  EmptyPad
}

export class ChartSeriesDef {
  name: string;
  color: string;
}
