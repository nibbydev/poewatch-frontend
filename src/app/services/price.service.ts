import {Injectable} from '@angular/core';
import {HttpParams} from '@angular/common/http';
import {BaseService} from './base.service';
import {GetEntry} from './data/get-entry';
import {Observable, Subject} from 'rxjs';
import {shareReplay} from 'rxjs/operators';
import {League} from './data/league';
import {Category} from './data/category';

@Injectable({
  providedIn: 'root'
})
export class PriceService {
  private entries$: Subject<GetEntry[]> = new Subject();

  constructor(private baseService: BaseService) {
  }

  public makeRequest(params: { league: League, category: Category }): void {
    const httpParams = new HttpParams()
      .set('league', params.league.name)
      .set('category', params.category.name);

    this.baseService.get<GetEntry[]>('get', httpParams, []).subscribe(entries => {
      this.entries$.next(entries);
    });
  }

  public getEntries(): Observable<GetEntry[]> {
    return this.entries$;
  }

  public get(params: { league: League, category: Category }): Observable<GetEntry[]> {
    const httpParams = new HttpParams()
      .set('league', params.league.name)
      .set('category', params.category.name);

    return this.baseService.get<GetEntry[]>('get', httpParams, [])
      .pipe(shareReplay());
  }
}
