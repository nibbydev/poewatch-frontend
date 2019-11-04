import {Injectable} from '@angular/core';
import {InputType, SearchCriteria} from '../shared/search-option';
import {GetEntry} from '../shared/get-entry';
import {Observable} from 'rxjs';
import {Category} from '../shared/category';

@Injectable({
  providedIn: 'root'
})
export class SearchCriteriaService {
  public readonly criteria: SearchCriteria[] = [
    {
      id: 'confidence',
      title: 'Confidence',
      inputType: InputType.RADIO,
      enabled: false,
      value: null,
      categories: null,
      reset: true,
      options: this.asObservable([
        {
          display: 'Hide',
          value: null
        },
        {
          display: 'Show',
          value: true
        }
      ]),
      showItem(e: GetEntry) {
        // if 'Show' is selected, do not hide any item. otherwise hide if there's a low amount of items
        return this.value ? true : e.daily >= 10 && e.current >= 10;
      },
    },
    {
      id: 'group',
      title: 'Group',
      inputType: InputType.DROPDOWN,
      enabled: false,
      value: null,
      categories: null,
      reset: true,
      options: null,
      showItem(e: GetEntry) {
        if (this.value === null) {
          return true;
        }

        return e.group === this.value;
      },
    },
    {
      id: 'league',
      title: 'League',
      inputType: InputType.DROPDOWN,
      enabled: false,
      value: null,
      categories: null,
      reset: false,
      options: null,
      showItem(e: GetEntry) {
        return true;
      },
    },
    {
      id: 'search',
      title: 'Search',
      inputType: InputType.INPUT,
      enabled: false,
      value: null,
      categories: null,
      reset: true,
      options: null,
      showItem(e: GetEntry) {
        if (!this.value) {
          return true;
        }

        const input = this.value.toLowerCase().trim();
        if (e.name.toLowerCase().indexOf(input) !== -1) {
          return true;
        } else if (e.type && e.type.toLowerCase().indexOf(input) !== -1) {
          return true;
        }

        return false;
      },
    },
    {
      id: 'rarity',
      title: 'Rarity',
      inputType: InputType.RADIO,
      enabled: false,
      value: null,
      categories: ['accessory', 'weapon', 'armour', 'flask'],
      reset: true,
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
      ]),
      showItem(e: GetEntry) {
        if (this.value === null) {
          return true;
        }

        if (e.frame === 3 && this.value !== 'unique') {
          return false;
        }

        if (e.frame === 9 && this.value !== 'relic') {
          return false;
        }

        return true;
      },
    },
    {
      id: 'links',
      title: 'Links',
      inputType: InputType.RADIO,
      enabled: false,
      value: null,
      categories: ['weapon', 'armour'],
      reset: true,
      options: this.asObservable([
        {
          display: 'No links',
          value: null
        },
        {
          display: 'Five links',
          value: 5
        },
        {
          display: 'Six links',
          value: 6
        },
      ]),
      showItem(e: GetEntry) {
        if (this.value === null && !e.linkCount) {
          return true;
        }

        if (this.value !== e.linkCount) {
          return false;
        }

        return true;
      },
    },
    {
      id: 'ilvl',
      title: 'Ilvl',
      inputType: InputType.DROPDOWN,
      enabled: false,
      value: null,
      categories: ['base'],
      reset: true,
      options: this.asObservable([
        {
          display: 'All',
          value: null
        },
        {
          display: '82',
          value: 82
        },
        {
          display: '83',
          value: 83
        },
        {
          display: '84',
          value: 84
        },
        {
          display: '85',
          value: 85
        },
        {
          display: '86+',
          value: 86
        },
      ]),
      showItem(e: GetEntry) {
        if (this.value === null) {
          return true;
        }

        return this.value === e.baseItemLevel;
      },
    },
    {
      id: 'influence',
      title: 'Influence',
      inputType: InputType.DROPDOWN,
      enabled: false,
      value: null,
      categories: ['base'],
      reset: true,
      options: this.asObservable([
        {
          display: 'Either',
          value: null
        },
        {
          display: 'None',
          value: 'none'
        },
        {
          display: 'Shaper',
          value: 'shaper'
        },
        {
          display: 'Elder',
          value: 'elder'
        },
      ]),
      showItem(e: GetEntry) {
        if (this.value === null) {
          return true;
        }

        if (this.value === 'none' && (e.baseIsElder || e.baseIsShaper)) {
          return false;
        }

        if (this.value === 'shaper' && !e.baseIsShaper) {
          return false;
        }

        if (this.value === 'elder' && !e.baseIsElder) {
          return false;
        }

        return true;
      },
    },
    {
      id: 'corruption',
      title: 'Corruption',
      inputType: InputType.RADIO,
      enabled: false,
      value: null,
      categories: ['gem'],
      reset: true,
      options: this.asObservable([
        {
          display: 'Either',
          value: null
        },
        {
          display: 'Yes',
          value: true
        },
        {
          display: 'No',
          value: false
        },
      ]),
      showItem(e: GetEntry) {
        if (this.value === null) {
          return true;
        }

        if (this.value && !e.gemIsCorrupted) {
          return false;
        }

        if (!this.value && e.gemIsCorrupted) {
          return false;
        }

        return true;
      },
    },
    {
      id: 'level',
      title: 'Level',
      inputType: InputType.DROPDOWN,
      enabled: false,
      value: null,
      categories: ['gem'],
      reset: true,
      options: this.asObservable([
        {
          display: 'All',
          value: null
        },
        {
          display: '1',
          value: 1
        },
        {
          display: '2',
          value: 2
        },
        {
          display: '3',
          value: 3
        },
        {
          display: '4',
          value: 4
        },
        {
          display: '6',
          value: 5
        },
        {
          display: '7',
          value: 7
        },
        {
          display: '20',
          value: 20
        },
        {
          display: '21',
          value: 21
        },
      ]),
      showItem(e: GetEntry) {
        if (this.value === null) {
          return true;
        }

        if (e.gemLevel !== this.value) {
          return false;
        }

        return true;
      },
    },
    {
      id: 'quality',
      title: 'Quality',
      inputType: InputType.DROPDOWN,
      enabled: false,
      value: null,
      categories: ['gem'],
      reset: true,
      options: this.asObservable([
        {
          display: 'All',
          value: null
        },
        {
          display: '0',
          value: 0
        },
        {
          display: '20',
          value: 20
        },
        {
          display: '23',
          value: 23
        }
      ]),
      showItem(e: GetEntry) {
        if (this.value === null) {
          return true;
        }

        if (e.gemQuality !== this.value) {
          return false;
        }

        return true;
      },
    },
    {
      id: 'tier',
      title: 'Tier',
      inputType: InputType.DROPDOWN,
      enabled: false,
      value: null,
      categories: ['map'],
      reset: true,
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
          value: 1
        },
        {
          display: '2',
          value: 2
        },
        {
          display: '3',
          value: 3
        },
        {
          display: '4',
          value: 4
        },
        {
          display: '5',
          value: 5
        },
        {
          display: '6',
          value: 6
        },
        {
          display: '7',
          value: 7
        },
        {
          display: '8',
          value: 8
        },
        {
          display: '9',
          value: 9
        },
        {
          display: '10',
          value: 10
        },
        {
          display: '11',
          value: 11
        },
        {
          display: '12',
          value: 12
        },
        {
          display: '13',
          value: 13
        },
        {
          display: '14',
          value: 14
        },
        {
          display: '15',
          value: 15
        },
        {
          display: '16',
          value: 16
        }
      ]),
      showItem(e: GetEntry) {
        if (this.value === null) {
          return true;
        }

        if (this.value === 'none' && e.mapTier) {
          return false;
        }

        if (this.value === 'white' && e.mapTier > 5) {
          return false;
        }

        if (this.value === 'yellow' && (e.mapTier < 6 || e.mapTier > 10)) {
          return false;
        }

        if (this.value === 'red' && e.mapTier < 11) {
          return false;
        }

        if (this.value !== e.mapTier) {
          return false;
        }

        return true;
      }
    },
    {
      id: 'variant',
      title: 'Has variant',
      inputType: InputType.RADIO,
      enabled: false,
      value: null,
      categories: ['armour', 'weapon', 'flask', 'accessory', 'jewel'],
      reset: true,
      options: this.asObservable([
        {
          display: 'Either',
          value: null
        },
        {
          display: 'Yes',
          value: true
        },
        {
          display: 'No',
          value: false
        },
      ]),
      showItem(e: GetEntry) {
        if (this.value === null) {
          return true;
        }

        if (this.value && !e.variation) {
          return false;
        }

        if (!this.value && e.variation) {
          return false;
        }

        return true;
      },
    },
  ];

  constructor() {
  }

  private asObservable<T>(a: T): Observable<T> {
    return new Observable(t => {
      t.next(a);
      t.complete();
    });
  }

  public getCriteria(id: string): SearchCriteria {
    return this.criteria.find(c => c.id === id);
  }

  public getEnabledCriteria(): SearchCriteria[] {
    return this.criteria.filter(c => c.enabled === true);
  }

  public reset(category: Category): void {
    this.criteria.forEach(c => {
      c.enabled = !c.categories || c.categories.includes(category.name.toLowerCase());
      if (c.reset) {
        c.value = null;
      }
    });
  }
}
