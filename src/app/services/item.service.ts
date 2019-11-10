import {Injectable} from '@angular/core';
import {BaseService} from './base.service';
import {Observable} from 'rxjs';
import {HttpParams} from '@angular/common/http';
import {ItemEntry} from '../shared/data/item-entry';

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  constructor(private baseService: BaseService) {
  }

  public makeRequest(id: number): Observable<ItemEntry> {
    const httpParams = new HttpParams()
      .set('id', id.toString());

    return this.baseService.get<ItemEntry>('item', httpParams, null);
  }
}
