import {Observable} from 'rxjs';
import {GetEntry} from './get-entry';

export class SearchCriteria {
  id: string;
  title: string;
  enabled: boolean;
  inputType: InputType;
  categories: string[];
  options: Observable<SearchOption[]>;
  value: any;
  showItem: (e: GetEntry) => boolean;
  reset: boolean;
}

export class SearchOption {
  public display: string;
  public value: any;

  constructor(display: string, value: any) {
    this.display = display;
    this.value = value;
  }
}

export enum InputType {
  RADIO,
  INPUT,
  DROPDOWN
}
