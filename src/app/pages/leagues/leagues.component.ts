import { Component, OnDestroy, OnInit } from '@angular/core';
import { LeagueService } from '../../services/api/league.service';
import { Subject, timer } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'pw-leagues',
  templateUrl: './leagues.component.html',
  styleUrls: ['./leagues.component.css']
})
export class LeaguesComponent implements OnInit, OnDestroy {

  private destroy$ = new Subject<boolean>();

  constructor(public leagueService: LeagueService) {
  }

  ngOnInit() {
    timer(0, 1000).pipe(takeUntil(this.destroy$)).subscribe();
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

}
