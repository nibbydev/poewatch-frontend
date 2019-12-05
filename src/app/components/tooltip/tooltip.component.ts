import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'pw-tooltip',
  templateUrl: './tooltip.component.html',
  styleUrls: ['./tooltip.component.css']
})
export class TooltipComponent implements OnInit {

  @Input() display: string;

  constructor() {
  }

  ngOnInit() {
  }

}
