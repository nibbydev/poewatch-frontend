import {Observable} from 'rxjs';

export class SearchTerm {
  public display: string;
  public value: any;

  constructor(display: string, value: any) {
    this.display = display;
    this.value = value;
  }
}

export class SearchCriteria {
  id: string;
  title: string;
  enabled: boolean;
  value: any;
  options: Observable<SearchTerm[]>;
}
