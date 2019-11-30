export class ChartResult {
  name: string;
  series: ChartSeries[];
  color: string;
}

export class ChartSeries {
  name: string;
  value: number;
  extra: ChartExtra;
}

export class ChartExtra {
  sequence: number;
  color: string;
}

export class ChartSeriesDef {
  name: string;
  color: string;
}

// todo: rename me
export class StatDefinition {
  id: string;
  display: string;
  description: string;
  color: string;
  unit: string;
}
