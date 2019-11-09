import {Injectable} from '@angular/core';
import {SearchCriteria, SearchOption} from '../shared/data/search-criteria';
import {GetEntry} from '../shared/data/get-entry';
import {Observable} from 'rxjs';
import {Category} from '../shared/data/category';
import {LeagueService} from './league.service';
import {League} from '../shared/data/league';
import {first} from 'rxjs/operators';
import {Rarity} from '../shared/data/rarity';

@Injectable({
  providedIn: 'root'
})
export class SearchCriteriaService {
  public readonly criteria: SearchCriteria[] = [
    {
      id: 'league',
      title: 'League',
      inputType: 'dropdown',
      visible: false,
      disabled: false,
      value: null,
      defaultOptionIndex: 0,
      categories: null,
      reset: false,
      showSpinner: true,
      options: new Observable(t => {
        this.leagueService.entries$.pipe(first()).subscribe(leagues => {
          const searchOptions: SearchOption[] = leagues.map(g => ({display: g.display, value: g.name})).reverse();
          t.next(searchOptions);
          t.complete();
        });
      }),
      showItem(e: GetEntry) {
        // always show regardless of league
        return true;
      }
    },
    {
      id: 'group',
      title: 'Group',
      inputType: 'dropdown',
      visible: false,
      disabled: false,
      value: null,
      defaultOptionIndex: 0,
      categories: null,
      reset: true,
      showSpinner: true,
      options: null,
      showItem(e: GetEntry) {
        switch (this.value) {
          case null:
          case 'all':
            return true;
          default:
            return e.group === this.value;
        }
      },
    },
    {
      id: 'search',
      title: 'Search',
      inputType: 'input',
      visible: false,
      disabled: false,
      value: null,
      defaultOptionIndex: null,
      categories: null,
      reset: true,
      showSpinner: false,
      options: null,
      showItem(e: GetEntry) {
        if (!this.value) {
          return true;
        }

        const input = this.value.toLowerCase().trim();
        if (e.name.toLowerCase().indexOf(input) !== -1) {
          return true;
        }

        if (e.type && e.type.toLowerCase().indexOf(input) !== -1) {
          return true;
        }

        return false;
      },
    },
    {
      id: 'confidence',
      title: 'Low Confidence',
      inputType: 'radio',
      visible: false,
      disabled: false,
      value: null,
      defaultOptionIndex: 0,
      categories: null,
      reset: true,
      showSpinner: true,
      options: this.asObservable([
        {
          display: 'Hide',
          value: 'hide'
        },
        {
          display: 'Show',
          value: 'show'
        }
      ]),
      showItem(e: GetEntry) {
        switch (this.value) {
          case null:
          case 'show':
            return true;
          case 'hide':
            return e.daily >= 10 && e.current >= 10;
          default:
            console.log('Invalid option', this, e);
            return true;
        }
      },
    },
    {
      id: 'rarity',
      title: 'Rarity',
      inputType: 'radio',
      visible: false,
      disabled: false,
      value: null,
      defaultOptionIndex: 0,
      categories: ['accessory', 'weapon', 'armour', 'flask'],
      reset: true,
      showSpinner: true,
      options: this.asObservable([
        {
          display: 'All',
          value: 'all'
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
        switch (this.value) {
          case null:
          case 'all':
            return true;
          case 'unique':
            return e.frame === Rarity.UNIQUE;
          case 'relic':
            return e.frame === Rarity.RELIC;
          default:
            console.log('Invalid option', this, e);
            return true;
        }
      },
    },
    {
      id: 'links',
      title: 'Links',
      inputType: 'radio',
      visible: false,
      disabled: false,
      value: null,
      defaultOptionIndex: 0,
      categories: ['weapon', 'armour'],
      reset: true,
      showSpinner: true,
      options: this.asObservable([
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
      ]),
      showItem(e: GetEntry) {
        switch (this.value) {
          case null:
          case 'none':
            return !e.linkCount;
          case '5':
            return e.linkCount === 5;
          case '6':
            return e.linkCount === 6;
          default:
            console.log('Invalid option', this, e);
            return true;
        }
      },
    },
    {
      id: 'ilvl',
      title: 'Ilvl',
      inputType: 'dropdown',
      visible: false,
      disabled: false,
      value: null,
      defaultOptionIndex: 0,
      categories: ['base'],
      reset: true,
      showSpinner: true,
      options: this.asObservable([
        {
          display: 'All',
          value: 'all'
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
      ]),
      showItem(e: GetEntry) {
        switch (this.value) {
          case null:
          case 'all':
            return true;
          default:
            return parseInt(this.value, 10) === e.baseItemLevel;
        }
      },
    },
    {
      id: 'influence',
      title: 'Influence',
      inputType: 'dropdown',
      visible: false,
      disabled: false,
      value: null,
      defaultOptionIndex: 0,
      categories: ['base'],
      reset: true,
      showSpinner: true,
      options: this.asObservable([
        {
          display: 'All',
          value: 'all'
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
      ]),
      showItem(e: GetEntry) {
        switch (this.value) {
          case null:
          case 'all':
            return true;
          case 'none':
            return !(e.baseIsElder || e.baseIsShaper);
          case 'either':
            return e.baseIsElder || e.baseIsShaper;
          case 'shaper':
            return e.baseIsShaper;
          case 'elder':
            return e.baseIsElder;
          default:
            console.log('Invalid option', this, e);
            return true;
        }
      },
    },
    {
      id: 'corruption',
      title: 'Corruption',
      inputType: 'radio',
      visible: false,
      disabled: false,
      value: null,
      defaultOptionIndex: 0,
      categories: ['gem'],
      reset: true,
      showSpinner: true,
      options: this.asObservable([
        {
          display: 'Either',
          value: 'either'
        },
        {
          display: 'Yes',
          value: 'yes'
        },
        {
          display: 'No',
          value: 'no'
        },
      ]),
      showItem(e: GetEntry) {
        switch (this.value) {
          case null:
          case 'either':
            return true;
          case 'yes':
            return e.gemIsCorrupted;
          case 'no':
            return !e.gemIsCorrupted;
          default:
            console.log('Invalid option', this, e);
            return true;
        }
      },
    },
    {
      id: 'level',
      title: 'Level',
      inputType: 'dropdown',
      visible: false,
      disabled: false,
      value: null,
      defaultOptionIndex: 0,
      categories: ['gem'],
      reset: true,
      showSpinner: true,
      options: this.asObservable([
        {
          display: 'All',
          value: 'all'
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
      ]),
      showItem(e: GetEntry) {
        switch (this.value) {
          case null:
          case 'all':
            return true;
          default:
            return parseInt(this.value, 10) === e.gemLevel;
        }
      },
    },
    {
      id: 'quality',
      title: 'Quality',
      inputType: 'dropdown',
      visible: false,
      disabled: false,
      value: null,
      defaultOptionIndex: 0,
      categories: ['gem'],
      reset: true,
      showSpinner: true,
      options: this.asObservable([
        {
          display: 'All',
          value: 'all'
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
      ]),
      showItem(e: GetEntry) {
        switch (this.value) {
          case null:
          case 'all':
            return true;
          default:
            return parseInt(this.value, 10) === e.gemQuality;
        }
      },
    },
    {
      id: 'tier',
      title: 'Tier',
      inputType: 'dropdown',
      visible: false,
      disabled: false,
      value: null,
      defaultOptionIndex: 0,
      categories: ['map'],
      reset: true,
      showSpinner: true,
      options: this.asObservable([
        {
          display: 'All',
          value: 'all'
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
          display: '16+',
          value: '16'
        }
      ]),
      showItem(e: GetEntry) {
        switch (this.value) {
          case null:
          case 'all':
            return true;
          case 'none':
            return !e.mapTier;
          case 'white':
            return e.mapTier < 6;
          case 'yellow':
            return e.mapTier > 5 && e.mapTier < 11;
          case 'red':
            return e.mapTier > 10;
          default:
            return parseInt(this.value, 10) === e.mapTier;
        }
      },
    },
    {
      id: 'variant',
      title: 'Has variant',
      inputType: 'radio',
      visible: false,
      disabled: false,
      value: null,
      defaultOptionIndex: 0,
      categories: ['armour', 'weapon', 'flask', 'accessory', 'jewel'],
      reset: true,
      showSpinner: true,
      options: this.asObservable([
        {
          display: 'Either',
          value: 'either'
        },
        {
          display: 'Yes',
          value: 'yes'
        },
        {
          display: 'No',
          value: 'no'
        },
      ]),
      showItem(e: GetEntry) {
        switch (this.value) {
          case null:
          case 'either':
            return true;
          case 'yes':
            return !!e.variation;
          case 'no':
            return !e.variation;
          default:
            console.log('Invalid option', this, e);
            return true;
        }
      },
    },
  ];

  constructor(private leagueService: LeagueService) {
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
    return this.criteria.filter(c => c.visible === true);
  }

  /**
   * Reset all criteria to default values
   */
  public resetAll(): void {
    this.criteria.forEach(c => {
      c.disabled = false;
      c.visible = false;
      this.setDefaultCriteriaValue(c);
    });
  }

  public setState(category: Category | null): void {
    this.criteria.forEach(c => {
      c.visible = !c.categories || c.categories.includes(category.name.toLowerCase());
      c.disabled = false;

      if (c.reset) {
        this.setDefaultCriteriaValue(c);
      }
    });
  }

  public setDefaultCriteriaValue(c: SearchCriteria): void {
    if (!c.options || c.defaultOptionIndex === null) {
      c.value = null;
      return;
    }

    c.options.pipe(first()).subscribe(o => {
      c.value = o[c.defaultOptionIndex].value;
    });
  }
}
