import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { League } from '../modules/api/league';
import { Observable } from 'rxjs';
import { first, shareReplay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LeagueService {

  public readonly entries$: Observable<League[]>;
  public readonly filters = {
    active: (l: League) => l.active,
    inactive: (l: League) => !l.active,
  };

  constructor(private baseService: BaseService) {
    this.entries$ = this.baseService.get<League[]>('leagues', null, [])
      .pipe(shareReplay());
  }

  public filerLeagues(filter: (l: League) => boolean, reverse: boolean = false): Observable<League[]> {
    return new Observable<League[]>(n => {
      this.entries$.pipe(first()).subscribe(l => {
        const leagues = l.filter(filter);
        n.next(reverse ? leagues.reverse() : leagues);
        n.complete();
      });
    });
  }
}
