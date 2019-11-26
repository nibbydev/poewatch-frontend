import { Component, Input, OnInit } from '@angular/core';
import { ChartResult, StatDefinition } from '../../shared/chart-result';

@Component({
  selector: 'app-stats-chart',
  templateUrl: './stats-chart.component.html',
  styleUrls: ['./stats-chart.component.css']
})
export class StatsChartComponent implements OnInit {
  @Input() results: ChartResult[];
  @Input() definitions: StatDefinition[];

  public colorScheme: { domain: string[] };
  public printOut = console.log; // todo: remove me

  constructor() {
  }

  ngOnInit() {
    this.colorScheme = {domain: this.definitions.map(s => s.color)};
    console.log(this.colorScheme);
  }

  /**
   * Hides X-axis ticks
   */
  public emptyTickFormatting = () => '';

}
