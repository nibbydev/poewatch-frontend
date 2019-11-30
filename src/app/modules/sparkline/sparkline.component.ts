import {ChangeDetectionStrategy, Component, Input, ViewEncapsulation} from '@angular/core';
import {scaleLinear, scalePoint, scaleTime} from 'd3-scale';
import {curveLinear} from 'd3-shape';
import {
  BaseChartComponent,
  calculateViewDimensions,
  ColorHelper,
  getUniqueXDomainValues,
  ViewDimensions
} from '@swimlane/ngx-charts';
import {ChartResult} from '../../shared/chart-result';

@Component({
  selector: 'pw-sparkline',
  template: `
    <ngx-charts-chart *ngIf="dims"
                      [view]="[width, height]"
                      [showLegend]="false"
                      [animations]="animations">
      <svg:g class="line-chart chart">
        <svg:g>
          <svg:g *ngFor="let series of results; trackBy:trackBy">
            <svg:g ngx-charts-line-series
                   [xScale]="xScale"
                   [yScale]="yScale"
                   [colors]="colors"
                   [data]="series"
                   [scaleType]="scaleType"
                   [curve]="curve"
                   [rangeFillOpacity]="0"
                   [animations]="animations"
            />
          </svg:g>
        </svg:g>
      </svg:g>
    </ngx-charts-chart>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./sparkline.component.css']
})
export class SparklineComponent extends BaseChartComponent {

  @Input() curve: any = curveLinear;
  @Input() schemeType = 'linear';
  @Input() animations = true;
  @Input() results: ChartResult[];
  @Input() view: [number, number];
  @Input() scheme: { domain: string[] };

  dims: ViewDimensions;
  xSet: any;
  xDomain: any;
  yDomain: any;
  seriesDomain: any;
  yScale: any;
  xScale: any;
  colors: ColorHelper;
  scaleType: string;

  ready = false;

  update(): void {
    if (this.ready) {
      return;
    } else {
      this.ready = true;
    }

    super.update();

    this.dims = calculateViewDimensions({
      width: this.width,
      height: this.height,
      margins: [0, 0, 0, 0],
      showXAxis: false,
      showYAxis: false,
      xAxisHeight: 0,
      yAxisWidth: 0,
      showXLabel: false,
      showYLabel: false,
      showLegend: false,
      legendType: this.schemeType
    });

    this.xDomain = this.getXDomain();
    this.yDomain = this.getYDomain();

    this.seriesDomain = this.getSeriesDomain();

    this.xScale = this.getXScale(this.xDomain, this.dims.width);
    this.yScale = this.getYScale(this.yDomain, this.dims.height);

    this.setColors();
  }

  getXDomain(): any[] {
    let values = getUniqueXDomainValues(this.results);

    this.scaleType = this.getScaleType(values);
    let domain = [];

    if (this.scaleType === 'time') {
      const min = Math.min(...values);
      const max = Math.max(...values);
      domain = [min, max];
    } else if (this.scaleType === 'linear') {
      values = values.map(v => Number(v));
      const min = Math.min(...values);
      const max = Math.max(...values);
      domain = [min, max];
    } else {
      domain = values;
    }

    this.xSet = values;
    return domain;
  }

  getYDomain(): any[] {
    const domain = [];

    for (const results of this.results) {
      for (const d of results.series) {
        if (domain.indexOf(d.value) < 0) {
          domain.push(d.value);
        }
      }
    }

    let min = Math.min(...domain);
    const max = Math.max(...domain);
    min = Math.min(0, min);

    return [min, max];
  }

  getSeriesDomain(): any[] {
    return this.results.map(d => d.name);
  }

  getXScale(domain, width): any {
    let scale;

    if (this.scaleType === 'time') {
      scale = scaleTime()
        .range([0, width])
        .domain(domain);
    } else if (this.scaleType === 'linear') {
      scale = scaleLinear()
        .range([0, width])
        .domain(domain);
    } else if (this.scaleType === 'ordinal') {
      scale = scalePoint()
        .range([0, width])
        .padding(0.1)
        .domain(domain);
    }

    return scale;
  }

  getYScale(domain, height): any {
    return scaleLinear()
      .range([height, 0])
      .domain(domain);
  }

  getScaleType(values): string {
    let date = true;
    let num = true;

    for (const value of values) {
      if (!this.isDate(value)) {
        date = false;
      }

      if (typeof value !== 'number') {
        num = false;
      }
    }

    if (date) {
      return 'time';
    }
    if (num) {
      return 'linear';
    }
    return 'ordinal';
  }

  isDate(value): boolean {
    if (value instanceof Date) {
      return true;
    }

    return false;
  }

  trackBy(index, item): string {
    return item.name;
  }

  setColors(): void {
    let domain;
    if (this.schemeType === 'ordinal') {
      domain = this.seriesDomain;
    } else {
      domain = this.yDomain;
    }

    this.colors = new ColorHelper(this.scheme, this.schemeType, domain, this.customColors);
  }
}
