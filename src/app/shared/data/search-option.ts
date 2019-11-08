import {Observable} from 'rxjs';
import {GetEntry} from './get-entry';

export class SearchCriteria {
  id: string;
  title: string;
  enabled: boolean;
  inputType: string;
  categories: string[];
  options: Observable<SearchOption[]>;
  value: string | null;
  showItem?: (e: GetEntry) => boolean;
  reset: boolean;
  // integer or null if not applicable (eg search input)
  defaultOptionIndex: number | null;
}

export class SearchOption {
  public display: string;
  public value: string;
}
