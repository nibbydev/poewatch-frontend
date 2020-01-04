import { Observable, Subject } from 'rxjs';
import { first, takeUntil } from 'rxjs/operators';
import { Category } from '../modules/api/category';
import { Criteria, PriceSearchCriteria } from '../modules/criteria';
import { RouterHelperService } from '../services/router-helper.service';

export class CriteriaUtil {

  public static resetAll(criteria: Criteria[]): void {
    criteria.forEach(c => this.resetOne(c));
  }

  public static resetOne(c: Criteria): void {
    c.disabled = false;
    c.visible = false;
    CriteriaUtil.setDefaultCriteriaValue(c);
  }

  public static setDefaultCriteriaValue(c: Criteria): void {
    if (!c.options || c.defaultOptionIndex === null) {
      c.value = null;
      return;
    }

    if (c.options instanceof Observable) {
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

    if (c.options instanceof Array) {
      c.value = c.options ? c.options[c.defaultOptionIndex].value : null;
    }
  }

  public static updateQueryParams(rhs: RouterHelperService, criteria: Criteria): void {
    const queryParams = {};
    queryParams[criteria.id] = criteria.value
      ? criteria.value.trim()
      : criteria.value;

    // if it was empty string
    if (!queryParams[criteria.id]) {
      queryParams[criteria.id] = undefined;
    }

    // if there are no options or no default option, skip checking
    if (criteria.defaultOptionIndex === null || !criteria.options) {
      rhs.navigate(queryParams, true);
      return;
    }

    // options are observable, subscribe and verify
    if (criteria.options instanceof Observable) {
      criteria.options.pipe(first()).subscribe(o => {
        // some inputs send null to force loading state
        // todo .pipe(first()) should be replaced with takeUntil()?
        if (o === null) {
          return;
        }

        const defaultOption = o[criteria.defaultOptionIndex];
        // if value is equal to default option, unset the query param
        if (criteria.unsetDefaultQueryParam && defaultOption && queryParams[criteria.id] === defaultOption.value) {
          queryParams[criteria.id] = undefined;
        }

        // todo: calls twice for league? bad for performance?
        rhs.navigate(queryParams, true);
      });

      return;
    }

    // options are array, verify
    if (criteria.options instanceof Array) {
      const defaultOption = criteria.options[criteria.defaultOptionIndex];
      // if value is equal to default option, unset the query param
      if (criteria.unsetDefaultQueryParam && defaultOption && queryParams[criteria.id] === defaultOption.value) {
        queryParams[criteria.id] = undefined;
      }

      // todo: calls twice for league? bad for performance?
      rhs.navigate(queryParams, true);
    }
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
