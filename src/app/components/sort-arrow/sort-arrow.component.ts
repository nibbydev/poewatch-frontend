import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'pw-sort-arrow',
  templateUrl: './sort-arrow.component.html',
  styleUrls: ['./sort-arrow.component.css']
})
export class SortArrowComponent implements OnInit {

  @Output() stateChange = new EventEmitter<string>();
  @Input() display: string;
  public active = false;
  public state = null;

  constructor() {
  }

  ngOnInit() {
  }

  public cycle(): void {
    if (!this.state) {
      this.state = 'up';
      this.active = true;
    } else if (this.state === 'up') {
      this.state = 'down';
      this.active = true;
    } else {
      this.state = null;
      this.active = false;
    }
    this.stateChange.emit(this.state);
  }

}
