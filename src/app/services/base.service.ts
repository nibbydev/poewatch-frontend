import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { catchError, tap } from 'rxjs/operators';
import { AppSettings } from '../app-settings';

@Injectable({
  providedIn: 'root'
})
export class BaseService {
  constructor(protected http: HttpClient) {
  }

  get<T>(endPoint: string, params: HttpParams, ifFailed?: T): Observable<T> {
    const url = AppSettings.API_ENDPOINT + '/' + endPoint;

    return this.http.get<T>(url, {params}).pipe(
      tap(_ => console.log('Made request to ' + endPoint)),
      catchError(this.handleError<T>(endPoint, ifFailed))
    );
  }

  private handleError<T>(operation = 'operation', ifFailed?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(ifFailed as T);
    };
  }
}
