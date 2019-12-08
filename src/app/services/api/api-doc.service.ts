import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { shareReplay } from 'rxjs/operators';
import { Documentation } from '../../modules/api/documentation';

@Injectable({
  providedIn: 'root'
})
export class ApiDocService {
  public apiDoc$: Observable<Documentation[]>;

  constructor(private http: HttpClient) {
    this.apiDoc$ = this.getApiDoc()
      .pipe(shareReplay());
  }

  private getApiDoc(): Observable<Documentation[]> {
    return this.http.get<Documentation[]>('/assets/apidoc.json');
  }
}
