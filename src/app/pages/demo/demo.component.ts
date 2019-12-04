import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'pw-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.css']
})
export class DemoComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {
  }

  stateChange(state: string) {
    console.log(state);
  }
}
