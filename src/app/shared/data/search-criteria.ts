import {Observable, Subject} from 'rxjs';
import {GetEntry} from './get-entry';
import {takeUntil} from 'rxjs/operators';
import {Category} from './category';

export class SearchCriteria {
  id: string;
  title: string;
  // should the criteria input be shown to the user for the current category?
  visible: boolean;
  // if it is visible, should it be grayed out and not interactive
  disabled: boolean;
  // type of the input (eg radio/input/dropdown)
  inputType: string;
  options?: Observable<SearchOption[]>;
  value: string | null;
  // integer or null if not applicable (eg search input)
  defaultOptionIndex?: number;
  // set query param to default value on input initialization
  setInitialQueryParam: boolean;
  showSpinner: boolean;
  onChange?: () => void;

  public static resetAll(criteria: SearchCriteria[]): void {
    criteria.forEach(c => {
      c.disabled = false;
      c.visible = false;
      this.setDefaultCriteriaValue(c);
    });
  }

  public static setDefaultCriteriaValue(c: SearchCriteria): void {
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

  public static findCriteria(criteria: SearchCriteria[], id: string): SearchCriteria {
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

export class PriceSearchCriteria extends SearchCriteria {
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
