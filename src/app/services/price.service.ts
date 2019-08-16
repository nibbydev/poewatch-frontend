import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { BaseService } from './base.service';
import { GetEntry } from './data/get-entry';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PriceService {
  public entries$: Observable<GetEntry[]>;

  constructor(private baseService: BaseService) {
  }

  public get(league: string, category: string): void {
    const params = new HttpParams()
      .set('league', league ? league : 'Standard')
      .set('category', category ? category : 'currency');

    this.entries$ = this.baseService.get<GetEntry[]>('get', params, []);
  }
}
