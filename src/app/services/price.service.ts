import {Injectable} from '@angular/core';
import {HttpParams} from '@angular/common/http';
import {BaseService} from './base.service';
import {GetEntry} from '../shared/api/get-entry';
import {Observable} from 'rxjs';
import {League} from '../shared/api/league';
import {Category} from '../shared/api/category';

@Injectable({
  providedIn: 'root'
})
export class PriceService {
  constructor(private baseService: BaseService) {
  }

  public makeRequest(league: League, category: Category): Observable<GetEntry[]> {
    const httpParams = new HttpParams()
      .set('league', league.name)
      .set('category', category.name);

    return this.baseService.get<GetEntry[]>('get', httpParams, []);
  }
}
