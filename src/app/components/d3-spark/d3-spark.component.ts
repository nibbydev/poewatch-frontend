import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { area as d3_area, line as d3_line, range as d3_range, scaleLinear as d3_scaleLinear, select as d3_select } from 'd3';
import * as d3_shape from 'd3-shape';

@Component({
  selector: 'pw-d3-spark',
  template: '<div #container class="d-inline-block"></div>',
  styleUrls: ['./d3-spark.component.css']
})
export class D3SparkComponent implements OnInit, AfterViewInit {
  @Input() size: [number, number] = [200, 90];
  @Input() padding: [number, number, number, number] = [0, 0, 0, 0];
  @Input() data: number[] = d3_range(7).map(d => Math.random());
  @Input() colors: string[] = ['#a8b992', '#b8afb6'];
  @ViewChild('container', {static: false}) container;

  constructor() {
  }

  ngAfterViewInit() {
    const [w, h] = this.size;
    const [pT, pR, pB, pL] = this.padding;

    const innerWidth = w - pL - pR;
    const innerHeight = h - pT - pB;

    const scaleX = d3_scaleLinear().domain([0, this.data.length - 1]).range([0, innerWidth]);
    const scaleY = d3_scaleLinear().domain([0, 1]).range([innerHeight, 0]);

    const svg = d3_select(this.container.nativeElement).append('svg')
      .attr('width', w)
      .attr('height', h)
      .append('g')
      .attr('transform', 'translate(' + pL + ',' + pT + ')');

    const line = d3_line()
      .x((d, i) => scaleX(i))
      .y(d => scaleY(d))
      .curve(d3_shape.curveCardinal);

    const area = d3_area()
      .x((d, i) => scaleX(i))
      .y(d => scaleY(d))
      .y1(d => innerHeight)
      .curve(d3_shape.curveCardinal);

    svg.append('path').datum(this.data)
      .attr('fill', 'none')
      .attr('stroke', 'url(#gradient)')
      .attr('stroke-width', 1.5)
      .attr('d', line);

    svg.append('path')
      .attr('fill', 'rgba(0,0,0,0.15)')
      .attr('d', area(this.data));

    this.buildGradient(svg, this.colors);
  }

  ngOnInit() {
  }

  buildGradient(svg: any, colors: string[]): void {
    const linearGradient = svg.append('defs')
      .append('linearGradient')
      .attr('id', 'gradient')
      .attr('gradientTransform', 'rotate(90)');

    for (let j = 0; j < colors.length - 1; j++) {
      const percentage = Math.round(j / colors.length * 100);
      linearGradient.append('stop')
        .attr('offset', percentage + '%')
        .attr('stop-color', colors[j]);
    }

    linearGradient.append('stop')
      .attr('offset', '100%')
      .attr('stop-color', colors[colors.length - 1]);
  }

}
