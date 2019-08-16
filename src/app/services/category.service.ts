import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { CategoryEntry } from './data/category-entry';
import { GroupEntry } from './data/group-entry';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  public groups$: Observable<CategoryEntry[]>;

  constructor(private baseService: BaseService) {
    this.groups$ = this.baseService.get<CategoryEntry[]>('categories', null, []);
  }

  getGroups(category: string): Observable<GroupEntry[]> {
    return new Observable(t => {
      this.groups$.subscribe(n => {
        const categoryEntry = n.find((m) => m.name.toLowerCase() === category);
        t.next(categoryEntry.groups);
        t.complete();
        return {unsubscribe(): void {}};
      });
    });
  }
}
