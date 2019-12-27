import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'pw-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.css']
})
export class SpinnerComponent implements OnInit {
  @Input() public ifValue: any;
  @Input() public isSmall: boolean;

  constructor() {
  }

  ngOnInit() {
  }

  public isObservable(): boolean {
    return this.ifValue instanceof Observable;
  }
}
