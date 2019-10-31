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
  id: CriteriaType;
  title: string;
  enabled: boolean;
  type: InputType;
  value: any;
  options: Observable<SearchTerm[]>;
}

export enum CriteriaType {
  CONFIDENCE = 'confidence',
  GROUP = 'group',
  LEAGUE = 'league',
  SEARCH = 'search',
  RARITY = 'rarity',
  LINKS = 'links',
  ILVL = 'ilvl',
  INFLUENCE = 'influence',
  CORRUPTION = 'corruption',
  LEVEL = 'level',
  QUALITY = 'quality',
  TIER = 'tier'
}

export enum InputType {
  RADIO,
  INPUT,
  DROPDOWN
}
