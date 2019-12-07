import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { SortArrowState } from '../../modules/sort-arrow-state';

@Component({
  selector: 'pw-sort-arrow',
  templateUrl: './sort-arrow.component.html',
  styleUrls: ['./sort-arrow.component.css']
})
export class SortArrowComponent implements OnInit, OnDestroy {

  @Output() stateChange = new EventEmitter<{ id: string, state: SortArrowState }>();
  @Input() display: string;
  @Input() id: string;

  @Input() reset: Observable<string>;
  public states = SortArrowState;
  public state = SortArrowState.NONE;
  private resetSubscription$: Subscription;

  constructor() {
  }

  ngOnInit() {
    this.resetSubscription$ = this.reset.subscribe(r => {
      if (r !== this.id) {
        this.state = SortArrowState.NONE;
      }
    });
  }

  ngOnDestroy(): void {
    if (this.resetSubscription$) {
      this.resetSubscription$.unsubscribe();
    }
  }


  public cycle(): void {
    if (this.state === SortArrowState.NONE) {
      this.state = SortArrowState.ASCENDING;
    } else if (this.state === SortArrowState.ASCENDING) {
      this.state = SortArrowState.DESCENDING;
    } else {
      this.state = SortArrowState.NONE;
    }
    this.stateChange.emit({id: this.id, state: this.state});
  }

}
