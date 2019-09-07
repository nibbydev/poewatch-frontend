import {Component, EventEmitter, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-details-modal',
  templateUrl: './details-modal.component.html',
  styleUrls: ['./details-modal.component.css']
})
export class DetailsModalComponent implements OnInit {
  @Input() public emitter: EventEmitter<string>;

  constructor() { }

  ngOnInit() {
  }

}
