import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { BaseService } from '../base.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  constructor(private baseService: BaseService) {
  }

  public makeRequest(character: string): Observable<Account[]> {
    const httpParams = new HttpParams()
      .set('character', character);

    return this.baseService.get<Account[]>('accounts', httpParams, []);
  }
}
