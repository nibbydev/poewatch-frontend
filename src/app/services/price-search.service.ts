import {Injectable} from '@angular/core';
import {GetEntry} from './data/get-entry';
import {Observable} from 'rxjs';
import {CriteriaType, InputType, SearchCriteria} from '../pages/prices/prices-search/search-option';
import {Category} from './data/category';

@Injectable({
  providedIn: 'root'
})
export class PriceSearchService {
  private filteredEntries$: Observable<GetEntry[]>;
  public readonly criteria: SearchCriteria[] = [
    {
      id: CriteriaType.CONFIDENCE,
      title: 'Confidence',
      inputType: InputType.RADIO,
      enabled: true,
      value: null,
      categories: null,
      options: this.asObservable([
        {
          display: 'Hide',
          value: null
        },
        {
          display: 'Show',
          value: 'show'
        }
      ])
    },
    {
      id: CriteriaType.GROUP,
      title: 'Group',
      inputType: InputType.DROPDOWN,
      enabled: true,
      value: null,
      categories: null,
      options: null
    },
    {
      id: CriteriaType.LEAGUE,
      title: 'League',
      inputType: InputType.DROPDOWN,
      enabled: true,
      value: null,
      categories: null,
      options: null
    },
    {
      id: CriteriaType.SEARCH,
      title: 'Search',
      inputType: InputType.INPUT,
      enabled: true,
      value: null,
      categories: null,
      options: null
    },
    {
      id: CriteriaType.RARITY,
      title: 'Rarity',
      inputType: InputType.RADIO,
      enabled: true,
      value: null,
      categories: ['accessory', 'weapon', 'armour', 'flask'],
      options: this.asObservable([
        {
          display: 'All',
          value: null
        },
        {
          display: 'Unique',
          value: 'unique'
        },
        {
          display: 'Relic',
          value: 'relic'
        },
      ])
    },
    {
      id: CriteriaType.LINKS,
      title: 'Links',
      inputType: InputType.RADIO,
      enabled: true,
      value: null,
      categories: ['weapon', 'armour'],
      options: this.asObservable([
        {
          display: 'All links',
          value: null
        },
        {
          display: 'No links',
          value: 'none'
        },
        {
          display: 'Five links',
          value: '5'
        },
        {
          display: 'Six links',
          value: '6'
        },
      ])
    },
    {
      id: CriteriaType.ILVL,
      title: 'Ilvl',
      inputType: InputType.DROPDOWN,
      enabled: true,
      value: null,
      categories: ['base'],
      options: this.asObservable([
        {
          display: 'All',
          value: null
        },
        {
          display: '82',
          value: '82'
        },
        {
          display: '83',
          value: '83'
        },
        {
          display: '84',
          value: '84'
        },
        {
          display: '85',
          value: '85'
        },
        {
          display: '86+',
          value: '86'
        },
      ])
    },
    {
      id: CriteriaType.INFLUENCE,
      title: 'Influence',
      inputType: InputType.DROPDOWN,
      enabled: true,
      value: null,
      categories: ['base'],
      options: this.asObservable([
        {
          display: 'All',
          value: null
        },
        {
          display: 'None',
          value: 'none'
        },
        {
          display: 'Either',
          value: 'either'
        },
        {
          display: 'Shaper',
          value: 'shaper'
        },
        {
          display: 'Elder',
          value: 'elder'
        },
      ])
    },
    {
      id: CriteriaType.CORRUPTION,
      title: 'Corruption',
      inputType: InputType.RADIO,
      enabled: true,
      value: null,
      categories: ['gem'],
      options: this.asObservable([
        {
          display: 'Either',
          value: null
        },
        {
          display: 'Yes',
          value: 'yes'
        },
        {
          display: 'No',
          value: 'no'
        },
      ])
    },
    {
      id: CriteriaType.LEVEL,
      title: 'Level',
      inputType: InputType.DROPDOWN,
      enabled: true,
      value: null,
      categories: ['gem'],
      options: this.asObservable([
        {
          display: 'All',
          value: null
        },
        {
          display: '1',
          value: '1'
        },
        {
          display: '2',
          value: '2'
        },
        {
          display: '3',
          value: '3'
        },
        {
          display: '4',
          value: '4'
        },
        {
          display: '6',
          value: '6'
        },
        {
          display: '7',
          value: '7'
        },
        {
          display: '20',
          value: '20'
        },
        {
          display: '21',
          value: '21'
        },
      ])
    },
    {
      id: CriteriaType.QUALITY,
      title: 'Quality',
      inputType: InputType.DROPDOWN,
      enabled: true,
      value: null,
      categories: ['gem'],
      options: this.asObservable([
        {
          display: 'All',
          value: null
        },
        {
          display: '0',
          value: '0'
        },
        {
          display: '20',
          value: '20'
        },
        {
          display: '23',
          value: '23'
        }
      ])
    },
    {
      id: CriteriaType.TIER,
      title: 'Tier',
      inputType: InputType.DROPDOWN,
      enabled: true,
      value: null,
      categories: ['map'],
      options: this.asObservable([
        {
          display: 'All',
          value: null
        },
        {
          display: 'None',
          value: 'none'
        },
        {
          display: 'White',
          value: 'white'
        },
        {
          display: 'Yellow',
          value: 'yellow'
        },
        {
          display: 'Red',
          value: 'red'
        },
        {
          display: '1',
          value: '1'
        },
        {
          display: '2',
          value: '2'
        },
        {
          display: '3',
          value: '3'
        },
        {
          display: '4',
          value: '4'
        },
        {
          display: '5',
          value: '5'
        },
        {
          display: '6',
          value: '6'
        },
        {
          display: '7',
          value: '7'
        },
        {
          display: '8',
          value: '8'
        },
        {
          display: '9',
          value: '9'
        },
        {
          display: '10',
          value: '10'
        },
        {
          display: '11',
          value: '11'
        },
        {
          display: '12',
          value: '12'
        },
        {
          display: '13',
          value: '13'
        },
        {
          display: '14',
          value: '14'
        },
        {
          display: '15',
          value: '15'
        },
        {
          display: '16',
          value: '16'
        }
      ])
    },
  ];

  constructor() {
  }

  public filter(entries$: Observable<GetEntry[]>, criteria: SearchCriteria[]): void {
    const subscription = entries$.subscribe(entries => {
      this.filteredEntries$ = new Observable(t => {

        const enabledCriteria = criteria.filter(c => c.enabled);
        const filteredEntries = entries.filter(e => {
          return enabledCriteria.some(c => {
            return this.isMatch(e, c);
          });
        });

        t.next(filteredEntries);
        t.complete();
        subscription.unsubscribe();
      });
    });
  }

  private isMatch(e: GetEntry, c: SearchCriteria): boolean {
    switch (c.id) {
      case CriteriaType.CONFIDENCE:
        break;
      case CriteriaType.GROUP:
        break;
      case CriteriaType.LEAGUE:
        break;
      case CriteriaType.SEARCH:
        break;
      case CriteriaType.RARITY:
        break;
      case CriteriaType.LINKS:
        break;
      case CriteriaType.ILVL:
        break;
      case CriteriaType.INFLUENCE:
        break;
      case CriteriaType.CORRUPTION:
        break;
      case CriteriaType.LEVEL:
        break;
      case CriteriaType.QUALITY:
        break;
      case CriteriaType.TIER:
        break;
    }
    return true;
  }

  public getCriteria(type: CriteriaType): SearchCriteria {
    return this.criteria.find(c => c.id === type);
  }

  public getEnabledCriteria(): SearchCriteria[] {
    return this.criteria.filter(c => c.enabled === true);
  }

  private asObservable<T>(a: T): Observable<T> {
    return new Observable(t => {
      t.next(a);
      t.complete();
    });
  }

  public filterCriteria(category: Category): void {
    this.criteria.forEach(c => c.enabled = false);
    this.criteria.filter(c => !c.categories || c.categories.includes(category.name.toLowerCase()))
      .forEach(c => c.enabled = true);
  }
}
