import {Component, Input, OnInit} from '@angular/core';
import {ChartResult, StatDefinition} from '../../../modules/chart-result';
import * as shape from 'd3-shape';

@Component({
  selector: 'pw-stats-chart',
  templateUrl: './stats-chart.component.html',
  styleUrls: ['./stats-chart.component.css']
})
export class StatsChartComponent implements OnInit {
  @Input() data: {
    id: string,
    members: StatDefinition[],
    results: ChartResult[],
    curve: shape
  };

  public colorScheme: { domain: string[] };

  constructor() {
  }

  ngOnInit() {
    this.colorScheme = {domain: this.data.members.map(s => s.color)};
  }

  /**
   * Hides X-axis ticks
   */
  public emptyTickFormatting = () => '';

}
