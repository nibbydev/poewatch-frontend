import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { CategoryEntry } from './data/category-entry';
import { GroupEntry } from './data/group-entry';
import { Observable } from 'rxjs';
import { shareReplay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  public entries$: Observable<CategoryEntry[]>;

  constructor(private baseService: BaseService) {
    this.entries$ = this.baseService.get<CategoryEntry[]>('categories', null, [])
      .pipe(shareReplay());
  }

  getGroups(category: string): Observable<GroupEntry[]> {
    return new Observable(t => {
      this.entries$.subscribe(n => {
        const categoryEntry = n.find((m) => m.name.toLowerCase() === category);
        t.next(categoryEntry.groups);
        t.complete();
      });
    });
  }
}
