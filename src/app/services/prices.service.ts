import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { PricesItem } from '../pages/prices/prices-item';
import { catchError, tap } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class PricesService {
  private apiUrl = 'https://api.poe.watch/get';

  constructor(private http: HttpClient, private route: ActivatedRoute) {
  }

  getPrices(league: string, category: string): Observable<PricesItem[]> {
    const params = new HttpParams()
      .set('league', league ? league : 'Standard')
      .set('category', category ? category : 'currency');

    return this.http.get<PricesItem[]>(this.apiUrl, {params}).pipe(
      tap(_ => console.log('Fetched a bunch of prices')),
      catchError(this.handleError<PricesItem[]>('getPrices', []))
    );

    return new Observable((observer) => {
      setTimeout(() => {
        observer.next(null);
        observer.complete();
      }, 100);
    });
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error); // log to console instead
      return of(result as T);
    };
  }
}
