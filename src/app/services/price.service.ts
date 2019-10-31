import {Injectable} from '@angular/core';
import {HttpParams} from '@angular/common/http';
import {BaseService} from './base.service';
import {GetEntry} from './data/get-entry';
import {Observable} from 'rxjs';
import {shareReplay} from 'rxjs/operators';
import {League} from './data/league';
import {Category} from './data/category';

@Injectable({
  providedIn: 'root'
})
export class PriceService {
  constructor(private baseService: BaseService) {
  }

  public get(params: { league: League, category: Category }): Observable<GetEntry[]> {
    const httpParams = new HttpParams()
      .set('league', params.league.name)
      .set('category', params.category.name);

    return this.baseService.get<GetEntry[]>('get', httpParams, [])
      .pipe(shareReplay());
  }
}
