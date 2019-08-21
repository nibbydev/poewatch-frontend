import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { LeagueEntry } from './data/league-entry';
import { Observable } from 'rxjs';
import { shareReplay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LeagueService {
  public entries$: Observable<LeagueEntry[]>;

  constructor(private baseService: BaseService) {
    this.entries$ = this.baseService.get<LeagueEntry[]>('leagues', null, [])
      .pipe(shareReplay());
  }
}
