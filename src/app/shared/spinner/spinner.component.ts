import {Component, Input, OnInit} from '@angular/core';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.css']
})
export class SpinnerComponent implements OnInit {
  @Input() observable$: Observable<any>;
  @Input() private isSmall: boolean;

  constructor() { }

  ngOnInit() {
  }

}
