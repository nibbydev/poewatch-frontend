import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { Observable } from 'rxjs';
import { Stat } from '../modules/api/stat';
import { shareReplay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class StatsService {

  public readonly entries$: Observable<Stat[]>;

  constructor(private baseService: BaseService) {
    this.entries$ = this.baseService.get<Stat[]>('stats2', null, [])
      .pipe(shareReplay());
  }

}
