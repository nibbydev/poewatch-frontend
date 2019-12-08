import { Observable } from 'rxjs';
import { GetEntry } from './api/get-entry';

export class Criteria {
  // unique identifier, used as query param key
  id: string;
  // title/label of the input
  title: string;
  // show the title/label
  showTitle: boolean;
  // should the criteria input be visible
  visible: boolean;
  // should it be disabled and grayed out
  disabled: boolean;
  // type of the input (eg radio/input/dropdown)
  inputType: 'radio' | 'input' | 'dropdown';
  // a list of options or null
  options?: Observable<SearchOption[]>;
  // current value of the input
  value?: string;
  // index of the default option
  defaultOptionIndex?: number;
  // on input initialization set query param
  setInitialQueryParam: boolean;
  // whether to unset the default option in query params
  unsetDefaultQueryParam: boolean;
  // display a spinner when options are undefined
  showSpinner: boolean;
  // function called after input value changes
  onChange?: () => void;
  // called when the input has loaded options and set query params
  onReady?: () => void;
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
}
