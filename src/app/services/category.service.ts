import {Injectable} from '@angular/core';
import {BaseService} from './base.service';
import {Category, Group} from '../modules/api/category';
import {Observable} from 'rxjs';
import {shareReplay} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  public entries$: Observable<Category[]>;

  constructor(private baseService: BaseService) {
    this.entries$ = this.get().pipe(shareReplay());
  }

  public get(): Observable<Category[]> {
    return this.baseService.get<Category[]>('categories', null, []);
  }

  public getGroups(category: string): Observable<Group[]> {
    return new Observable(t => {
      this.entries$.subscribe(n => {
        const categoryEntry = n.find((m) => m.name.toLowerCase() === category);
        t.next(categoryEntry.groups);
        t.complete();
      });
    });
  }
}
