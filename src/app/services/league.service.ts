import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { LeagueEntry } from './data/league-entry';

@Injectable({
  providedIn: 'root'
})
export class LeagueService {
  public leagues: LeagueEntry[];

  constructor(private baseService: BaseService) {
    this.get();
  }

  get(): void {
    this.baseService.get<LeagueEntry[]>('leagues', null, [])
      .subscribe(t => this.leagues = t);
  }
}
