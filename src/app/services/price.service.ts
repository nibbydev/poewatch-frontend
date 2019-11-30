import {Injectable} from '@angular/core';
import {HttpParams} from '@angular/common/http';
import {BaseService} from './base.service';
import {GetEntry} from '../modules/api/get-entry';
import {Observable} from 'rxjs';
import {League} from '../modules/api/league';
import {Category} from '../modules/api/category';

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
