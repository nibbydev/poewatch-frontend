import {Injectable} from '@angular/core';
import {BaseService} from './base.service';
import {Observable} from 'rxjs';
import {HttpParams} from '@angular/common/http';
import {ItemHistory} from '../shared/data/item-history';

@Injectable({
  providedIn: 'root'
})
export class ItemHistoryService {
  constructor(private baseService: BaseService) {
  }

  public makeRequest(id: number, league: string): Observable<ItemHistory[]> {
    const httpParams = new HttpParams()
      .set('id', id.toString())
      .set('league', league);

    return this.baseService.get<ItemHistory[]>('itemhistory', httpParams, null);
  }
}
