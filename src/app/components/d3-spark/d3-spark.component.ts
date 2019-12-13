import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import {
  area as d3_area,
  line as d3_line,
  range as d3_range,
  scaleLinear as d3_scaleLinear,
  select as d3_select
} from 'd3';
import * as d3_shape from 'd3-shape';

@Component({
  selector: 'pw-d3-spark',
  template: '<div #container></div>',
  styleUrls: ['./d3-spark.component.css']
})
export class D3SparkComponent implements OnInit, AfterViewInit {
  @Input() size: [number, number] = [200, 90];
  @Input() padding: [number, number, number, number] = [0, 0, 0, 0];
  @Input() data: number[] = d3_range(7).map(d => Math.random());
  @Input() colors: string[] = ['#a8b992', '#b8afb6'];
  @ViewChild('container', {static: false}) container;

  private readonly strokeWidth = 1.5;
  private readonly backgroundOpacity = 0.15;

  constructor() {
  }

  ngOnInit() {
    this.data = this.formatData(this.data);
  }


  ngAfterViewInit() {
    const [w, h] = this.size;
    const [pT, pR, pB, pL] = this.padding;

    const innerWidth = w - pL - pR;
    const scaleX = d3_scaleLinear().domain([0, this.data.length - 1]).range([0, innerWidth]);

    const innerHeightLine = h - pT - pB - this.strokeWidth;
    const innerHeightArea = h - pT - pB;
    const scaleYLine = d3_scaleLinear().domain([0, 1]).range([innerHeightLine, 0]);
    const scaleYArea = d3_scaleLinear().domain([0, 1]).range([innerHeightArea, 0]);

    const svg = d3_select(this.container.nativeElement).append('svg')
      .attr('width', w)
      .attr('height', h)
      .append('g')
      .attr('transform', 'translate(' + pL + ',' + pT + ')');

    const line = d3_line()
      .x((d, i) => scaleX(i))
      .y(d => scaleYLine(d) + this.strokeWidth / 2)
      .curve(d3_shape.curveMonotoneX);

    const area = d3_area()
      .x((d, i) => scaleX(i))
      .y(d => scaleYArea(d))
      .y1(d => h)
      .curve(d3_shape.curveMonotoneX);

    svg.append('path').datum(this.data)
      .attr('fill', 'none')
      .attr('stroke', 'url(#gradient)')
      .attr('stroke-width', this.strokeWidth)
      .attr('d', line);

    svg.append('path')
      .attr('fill', 'rgba(0,0,0,0.15)')
      .attr('d', area(this.data));

    const linearGradient = svg.append('defs')
      .append('linearGradient')
      .attr('id', 'gradient')
      .attr('gradientTransform', 'rotate(90)');

    for (let j = 0; j < this.colors.length - 1; j++) {
      const percentage = Math.round(j / this.colors.length * 100);
      linearGradient.append('stop')
        .attr('offset', percentage + '%')
        .attr('stop-color', this.colors[j]);
    }

    linearGradient.append('stop')
      .attr('offset', '100%')
      .attr('stop-color', this.colors[this.colors.length - 1]);

    // const stepSize = 50 / Math.floor(this.colors.length / 2);
    // let currentStep = 0;
    // for (const color of this.colors) {
    //   linearGradient.append('stop')
    //     .attr('offset', currentStep + '%')
    //     .attr('stop-color', color);
    //   currentStep += stepSize;
    // }
  }

  private formatData(data: number[]): number[] {
    if (!data) {
      return [];
    }

    const min = Math.min.apply(null, data);
    const max = Math.max.apply(null, data);
    const scale = d3_scaleLinear().domain([min, max]).range([0, 1]);
    return data.map(d => scale(d));
  }
}
