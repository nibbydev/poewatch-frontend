import { Injectable } from '@angular/core';
import { BaseService } from '../base.service';
import { Observable } from 'rxjs';
import { shareReplay } from 'rxjs/operators';
import { SiteData } from '../../modules/api/site-data';

@Injectable({
  providedIn: 'root'
})
export class SiteDataService {

  public readonly data$: Observable<SiteData>;

  constructor(private baseService: BaseService) {
    this.data$ = this.baseService.get<SiteData>('site-data', null, null)
      .pipe(shareReplay());
  }

}
