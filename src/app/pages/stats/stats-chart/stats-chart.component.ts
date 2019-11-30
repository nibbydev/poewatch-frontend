import {Component, Input, OnInit} from '@angular/core';
import {ChartResult, StatDefinition} from '../../../shared/chart-result';
import * as shape from 'd3-shape';

@Component({
  selector: 'pw-stats-chart',
  templateUrl: './stats-chart.component.html',
  styleUrls: ['./stats-chart.component.css']
})
export class StatsChartComponent implements OnInit {
  @Input() results: ChartResult[];
  @Input() definitions: StatDefinition[];
  curve = shape.curveCardinal;

  public colorScheme: { domain: string[] };

  constructor() {
  }

  ngOnInit() {
    this.colorScheme = {domain: this.definitions.map(s => s.color)};
  }

  /**
   * Hides X-axis ticks
   */
  public emptyTickFormatting = () => '';

}
