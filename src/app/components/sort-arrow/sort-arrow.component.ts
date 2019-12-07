import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'pw-sort-arrow',
  templateUrl: './sort-arrow.component.html',
  styleUrls: ['./sort-arrow.component.css']
})
export class SortArrowComponent implements OnInit, OnDestroy {

  @Output() stateChange = new EventEmitter<{ id: string, state: string }>();
  @Input() display: string;
  @Input() resetOn: Observable<string>;
  @Input() id: string;

  private subscription$: Subscription;
  public active = false;
  public state = null;

  constructor() {
  }

  ngOnInit() {
    this.subscription$ = this.resetOn.subscribe(r => {
      if (r === this.id) {
        return;
      }
      this.reset();
    });
  }

  ngOnDestroy(): void {
    if (this.subscription$) {
      this.subscription$.unsubscribe();
    }
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
    this.stateChange.emit({id: this.id, state: this.state});
  }

  public reset(): void {
    this.state = null;
    this.active = false;
  }

}
