import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { BaseService } from './base.service';
import { Observable } from 'rxjs';
import { Character } from '../modules/api/character';

@Injectable({
  providedIn: 'root'
})
export class CharacterService {
  constructor(private baseService: BaseService) {
  }

  public makeRequest(account: string): Observable<Character[]> {
    const httpParams = new HttpParams()
      .set('account', account);

    return this.baseService.get<Character[]>('characters', httpParams, []);
  }
}
