import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { shareReplay } from 'rxjs/operators';
import { Faq } from '../../modules/faq';

@Injectable({
  providedIn: 'root'
})
export class FaqService {
  public faq$: Observable<Faq>;

  constructor(private http: HttpClient) {
    this.faq$ = this.getApiDoc()
      .pipe(shareReplay());
  }

  private getApiDoc(): Observable<Faq> {
    return this.http.get<Faq>('/assets/faq.json');
  }
}
