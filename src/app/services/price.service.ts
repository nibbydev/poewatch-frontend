import {Injectable} from '@angular/core';
import {HttpParams} from '@angular/common/http';
import {BaseService} from './base.service';
import {GetEntry} from './data/get-entry';
import {Observable, Subject} from 'rxjs';
import {League} from './data/league';
import {Category} from './data/category';
import {PriceFilterService} from './price-filter.service';

@Injectable({
  providedIn: 'root'
})
export class PriceService {
  private entries$: Subject<GetEntry[]> = new Subject();

  constructor(private baseService: BaseService,
              private priceFilterService: PriceFilterService) {
  }

  public makeRequest(params: { league: League, category: Category }): void {
    this.entries$.next(null);

    const httpParams = new HttpParams()
      .set('league', params.league.name)
      .set('category', params.category.name);

    this.baseService.get<GetEntry[]>('get', httpParams, []).subscribe(entries => {
      this.priceFilterService.reset();
      entries = this.priceFilterService.filter(entries);
      this.entries$.next(entries);
    });
  }

  public getEntries(): Observable<GetEntry[]> {
    return this.entries$;
  }
}
