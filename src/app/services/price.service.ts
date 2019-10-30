import {Injectable} from '@angular/core';
import {HttpParams} from '@angular/common/http';
import {BaseService} from './base.service';
import {GetEntry} from './data/get-entry';
import {Observable} from 'rxjs';
import {shareReplay} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PriceService {
  constructor(private baseService: BaseService) {
  }

  public get(league: string, category: string): Observable<GetEntry[]> {
    const params = new HttpParams()
      .set('league', league)
      .set('category', category);

    return this.baseService.get<GetEntry[]>('get', params, [])
      .pipe(shareReplay());
  }
}
