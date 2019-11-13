import {Observable} from 'rxjs';
import {GetEntry} from './get-entry';

export class SearchCriteria {
  id: string;
  title: string;
  // should the criteria input be shown to the user for the current category?
  visible: boolean;
  // if it is visible, should it be grayed out and not interactive
  disabled: boolean;
  // type of the input (eg radio/input/dropdown)
  inputType: string;
  // list of categories this criteria will be visible under
  categories: string[];
  options: Observable<SearchOption[]>;
  value: string | null;
  showItem: (e: GetEntry) => boolean | null;
  // reset to default options when changing category or league
  reset: boolean;
  // integer or null if not applicable (eg search input)
  defaultOptionIndex: number | null;
  showSpinner: boolean;
  onChange: () => void | null;
}

export class SearchOption {
  public display: string;
  public value: string;
}
