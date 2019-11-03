import {Observable} from 'rxjs';
import {GetEntry} from '../../../services/data/get-entry';

export class SearchCriteria {
  id: CriteriaType;
  title: string;
  enabled: boolean;
  inputType: InputType;
  categories: string[];
  options: Observable<SearchOption[]>;
  value: any;
  checkHideItem: (e: GetEntry) => boolean;
}

export class SearchOption {
  public display: string;
  public value: any;

  constructor(display: string, value: any) {
    this.display = display;
    this.value = value;
  }
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
