import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {shareReplay} from 'rxjs/operators';
import {ApiDoc} from '../shared/data/api-doc';

@Injectable({
  providedIn: 'root'
})
export class ApiDocService {
  public apiDoc$: Observable<ApiDoc[]>;

  constructor(private http: HttpClient) {
    this.apiDoc$ = this.getApiDoc()
      .pipe(shareReplay());
  }

  private getApiDoc(): Observable<ApiDoc[]> {
    return this.http.get<ApiDoc[]>('/assets/apidoc.json');
  }
}
