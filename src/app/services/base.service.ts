import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { catchError, tap } from 'rxjs/operators';
import { AppConstants } from '../app-constants';

@Injectable({
  providedIn: 'root'
})
export class BaseService {
  constructor(protected http: HttpClient) {
  }

  get<T>(endPoint: string, params: HttpParams, ifFailed?: T): Observable<T> {
    const url = AppConstants.API_ENDPOINT + endPoint;

    return this.http.get<T>(url, {params}).pipe(
      tap(_ => console.log('Made request to ' + endPoint)),
      catchError(this.handleError<T>(endPoint, ifFailed))
    );
  }

  private handleError<T>(operation = '', ifFailed?: T) {
    return (error: any): Observable<T> => {
      console.error('Failed request to ' + operation);
      console.error(error);
      return of(ifFailed as T);
    };
  }
}
