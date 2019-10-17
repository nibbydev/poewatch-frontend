import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { League } from './data/league';
import { Observable } from 'rxjs';
import { shareReplay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LeagueService {
  public entries$: Observable<League[]>;

  constructor(private baseService: BaseService) {
    this.entries$ = this.baseService.get<League[]>('leagues', null, [])
      .pipe(shareReplay());
  }
}
