import {Observable, Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {Category} from '../modules/api/category';
import {Criteria, PriceSearchCriteria} from '../modules/criteria';

export class CriteriaUtil {

  public static resetAll(criteria: Criteria[]): void {
    criteria.forEach(c => {
      c.disabled = false;
      c.visible = false;
      CriteriaUtil.setDefaultCriteriaValue(c);
    });
  }

  public static setDefaultCriteriaValue(c: Criteria): void {
    if (!c.options || c.defaultOptionIndex === null) {
      c.value = null;
      return;
    }

    const destroy$ = new Subject<boolean>();
    c.options.pipe(takeUntil(destroy$)).subscribe(o => {
      if (o === null) {
        return;
      }

      // group sends null to force loading state on input
      c.value = o ? o[c.defaultOptionIndex].value : null;

      // stop the subscription
      destroy$.next(true);
      destroy$.complete();
    });
  }

  public static findCriteria(criteria: Criteria[], id: string): Criteria {
    return criteria.find(c => c.id === id);
  }

  public static asObservable<T>(a: T): Observable<T> {
    return new Observable(t => {
      t.next(a);
      t.complete();
    });
  }

  public static setState(criteria: PriceSearchCriteria[], category: Category | null): void {
    criteria.forEach(c => {
      c.visible = !c.categories || c.categories.includes(category.name.toLowerCase());
      c.disabled = false;

      if (c.reset) {
        this.setDefaultCriteriaValue(c);
      }
    });
  }

  public static getEnabledCriteria(criteria: PriceSearchCriteria[]): PriceSearchCriteria[] {
    return criteria.filter(c => c.visible === true);
  }

}
