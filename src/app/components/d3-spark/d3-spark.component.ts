import { Component, Input, OnInit } from '@angular/core';
import { area as d3_area, line as d3_line, range as d3_range, scaleLinear as d3_scaleLinear, select as d3_select } from 'd3';
import * as d3_shape from 'd3-shape';

@Component({
  selector: 'pw-d3-spark',
  templateUrl: './d3-spark.component.html',
  styleUrls: ['./d3-spark.component.css']
})
export class D3SparkComponent implements OnInit {
  @Input() size: [number, number] = [200, 90];
  @Input() padding: [number, number, number, number] = [0, 0, 0, 0];
  @Input() data: number[];

  constructor() {
  }

  ngOnInit() {
    if (!this.data) {
      this.data = d3_range(14).map(d => Math.random());
    }

    const [w, h] = this.size;
    const [pT, pR, pB, pL] = this.padding;

    const innerWidth = w - pL - pR;
    const innerHeight = h - pT - pB;

    const scaleX = d3_scaleLinear().domain([0, this.data.length - 1]).range([0, innerWidth]);
    const scaleY = d3_scaleLinear().domain([0, 1]).range([innerHeight, 0]);

    const svg = d3_select('.sparkline').append('svg')
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
      .attr('stroke', '#bbb')
      .attr('stroke-width', 2)
      .attr('d', line);

    svg.append('path')
      .attr('fill', 'rgba(255,255,255,0.2)')
      .attr('d', area(this.data));

    // svg.append('circle')
    //   .attr('r', 5)
    //   .attr('cx', x(0))
    //   .attr('cy', y(this.data[0]))
    //   .attr('fill', 'steelblue');
    //
    // svg.append('circle')
    //   .attr('r', 5)
    //   .attr('cx', x(this.data.length - 1))
    //   .attr('cy', y(this.data[this.data.length - 1]))
    //   .attr('fill', 'tomato');

  }
}
