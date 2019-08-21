import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { BaseService } from './base.service';
import { GetEntry } from './data/get-entry';
import { Observable } from 'rxjs';
import {shareReplay} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PriceService {
  public entries$: Observable<GetEntry[]>;
  private params = new HttpParams()
    .set('league', 'Standard')
    .set('category', 'currency');

  constructor(private baseService: BaseService) {
  }

  public get(league: string, category: string): void {
    if (this.params.get('league') === league && this.params.get('category')) {
      return;
    }

    this.params = new HttpParams()
      .set('league', league)
      .set('category', category);

    this.entries$ = this.baseService.get<GetEntry[]>('get', this.params, [])
      .pipe(shareReplay());
  }
}
