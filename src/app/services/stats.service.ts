import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { Observable } from 'rxjs';
import { Stat } from '../shared/api/stat';

@Injectable({
  providedIn: 'root'
})
export class StatsService {

  constructor(private baseService: BaseService) {
  }

  public makeRequest(): Observable<Stat[]> {
    return this.baseService.get<Stat[]>('stats2', null, []);
  }

}
