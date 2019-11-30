import {Component, Input, OnInit} from '@angular/core';
import {Observable} from 'rxjs';

@Component({
  selector: 'pw-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.css']
})
export class SpinnerComponent implements OnInit {
  @Input() private ifValue: any;
  @Input() private isSmall: boolean;

  constructor() { }

  ngOnInit() {
  }

  private isObservable(): boolean {
    return this.ifValue instanceof Observable;
  }
}
