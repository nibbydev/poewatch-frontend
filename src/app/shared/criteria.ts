import {Observable, Subject} from 'rxjs';
import {GetEntry} from './api/get-entry';
import {takeUntil} from 'rxjs/operators';
import {Category} from './api/category';

export class Criteria {
  // unique identifier, used as query param key
  id: string;
  // title/label of the input
  title?: string;
  // should the criteria input be visible
  visible: boolean;
  // should it be disabled and grayed out
  disabled: boolean;
  // type of the input (eg radio/input/dropdown)
  inputType: string;
  // a list of options or null
  options?: Observable<SearchOption[]>;
  // current value of the input
  value?: string;
  // index of the default option
  defaultOptionIndex?: number;
  //  on input initialization set query param
  setInitialQueryParam: boolean;
  // display a spinner when options are undefined
  showSpinner: boolean;
  // function called after input value changes
  onChange?: () => void;

  public static resetAll(criteria: Criteria[]): void {
    criteria.forEach(c => {
      c.disabled = false;
      c.visible = false;
      this.setDefaultCriteriaValue(c);
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

}

export class SearchOption {
  public display: string;
  public value: string;
}

export class PriceSearchCriteria extends Criteria {
  // list of categories this criteria will be visible under
  categories: string[];
  showItem?: (e: GetEntry) => boolean;
  // reset to default options when changing category or league
  reset: boolean;

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
