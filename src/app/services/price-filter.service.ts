import { Injectable } from '@angular/core';
import { GetEntry } from '../modules/api/get-entry';
import { BehaviorSubject, forkJoin, Observable, Subject } from 'rxjs';
import { Category, Group } from '../modules/api/category';
import { PriceService } from './api/price.service';
import { League } from '../modules/api/league';
import { PricePaginationService } from './price-pagination.service';
import { PriceSearchCriteria, SearchOption } from '../modules/criteria';
import { first } from 'rxjs/operators';
import { Rarity } from '../modules/rarity';
import { LeagueService } from './api/league.service';
import { CriteriaUtil } from '../utility/criteria-util';
import { SiteDataService } from './api/site-data.service';
import { SortArrowState } from '../modules/sort-arrow-state';

@Injectable({
  providedIn: 'root'
})
export class PriceFilterService {
  private readonly entries$: BehaviorSubject<GetEntry[]> = new BehaviorSubject(null);
  private rawEntries: GetEntry[] = null;
  private readonly sort = {
    field: null as string,
    state: SortArrowState.NONE
  };

  public readonly criteria: PriceSearchCriteria[] = [
    {
      id: 'league',
      title: 'League',
      showTitle: true,
      inputType: 'dropdown',
      visible: false,
      disabled: false,
      value: null,
      defaultOptionIndex: 0,
      unsetDefaultQueryParam: false,
      setInitialQueryParam: false,
      categories: null,
      reset: false,
      showSpinner: true,
      options: new Observable(t => {
        const formatName = (l: League) => (l.active ? '' : '> ') + (l.display ? l.display : l.name);
        forkJoin([
          this.leagueService.entries$,
          this.siteDataService.data$
        ]).pipe(first()).subscribe(result => {
          const [leagues, siteData] = result;
          const searchOptions: SearchOption[] = leagues
            .sort(this.leagueService.sortFn)
            .filter(l => siteData.leagues.includes(l.id))
            .map(l => ({display: formatName(l), value: l.name})).reverse();
          t.next(searchOptions);
          t.complete();
        });
      }),
      showItem(e: GetEntry) {
        // always show regardless of league
        return true;
      },
      onChange: () => this.sortEntries()
    },
    {
      id: 'group',
      title: 'Group',
      showTitle: true,
      inputType: 'dropdown',
      visible: false,
      disabled: false,
      value: null,
      defaultOptionIndex: 0,
      unsetDefaultQueryParam: true,
      setInitialQueryParam: false,
      categories: null,
      reset: true,
      showSpinner: true,
      options: new BehaviorSubject<SearchOption[]>(null),
      showItem(e: GetEntry) {
        switch (this.value) {
          case null:
          case 'all':
            return true;
          default:
            return e.group === this.value;
        }
      },
      onChange: () => this.sortEntries()
    },
    {
      id: 'search',
      title: 'Search',
      showTitle: true,
      inputType: 'input',
      visible: false,
      disabled: false,
      value: null,
      defaultOptionIndex: null,
      unsetDefaultQueryParam: true,
      setInitialQueryParam: false,
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
      onChange: () => this.sortEntries()
    },
    {
      id: 'confidence',
      title: 'Low Confidence',
      showTitle: true,
      inputType: 'radio',
      visible: false,
      disabled: false,
      value: null,
      defaultOptionIndex: 0,
      unsetDefaultQueryParam: true,
      setInitialQueryParam: false,
      categories: null,
      reset: true,
      showSpinner: true,
      options: [
        {
          display: 'Hide',
          value: 'hide'
        },
        {
          display: 'Show',
          value: 'show'
        }
      ],
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
      onChange: () => this.sortEntries()
    },
    {
      id: 'rarity',
      title: 'Rarity',
      showTitle: true,
      inputType: 'radio',
      visible: false,
      disabled: false,
      value: null,
      defaultOptionIndex: 0,
      unsetDefaultQueryParam: true,
      setInitialQueryParam: false,
      categories: ['accessory', 'weapon', 'armour', 'flask'],
      reset: true,
      showSpinner: true,
      options: [
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
        }
      ],
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
      onChange: () => this.sortEntries()
    },
    {
      id: 'links',
      title: 'Links',
      showTitle: true,
      inputType: 'radio',
      visible: false,
      disabled: false,
      value: null,
      defaultOptionIndex: 0,
      unsetDefaultQueryParam: true,
      setInitialQueryParam: false,
      categories: ['weapon', 'armour'],
      reset: true,
      showSpinner: true,
      options: [
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
        }
      ],
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
      onChange: () => this.sortEntries()
    },
    {
      id: 'ilvl',
      title: 'Ilvl',
      showTitle: true,
      inputType: 'dropdown',
      visible: false,
      disabled: false,
      value: null,
      defaultOptionIndex: 0,
      unsetDefaultQueryParam: true,
      setInitialQueryParam: false,
      categories: ['base'],
      reset: true,
      showSpinner: true,
      options: [
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
        }
      ],
      showItem(e: GetEntry) {
        switch (this.value) {
          case null:
          case 'all':
            return true;
          default:
            return parseInt(this.value, 10) === e.baseItemLevel;
        }
      },
      onChange: () => this.sortEntries()
    },
    {
      id: 'influence',
      title: 'Influence',
      showTitle: true,
      inputType: 'dropdown',
      visible: false,
      disabled: false,
      value: null,
      defaultOptionIndex: 0,
      unsetDefaultQueryParam: true,
      setInitialQueryParam: false,
      categories: ['base'],
      reset: true,
      showSpinner: true,
      options: [
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
        }
      ],
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
      onChange: () => this.sortEntries()
    },
    {
      id: 'corruption',
      title: 'Corruption',
      showTitle: true,
      inputType: 'radio',
      visible: false,
      disabled: false,
      value: null,
      defaultOptionIndex: 0,
      unsetDefaultQueryParam: true,
      setInitialQueryParam: false,
      categories: ['gem'],
      reset: true,
      showSpinner: true,
      options: [
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
        }
      ],
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
      onChange: () => this.sortEntries()
    },
    {
      id: 'level',
      title: 'Level',
      showTitle: true,
      inputType: 'dropdown',
      visible: false,
      disabled: false,
      value: null,
      defaultOptionIndex: 0,
      unsetDefaultQueryParam: true,
      setInitialQueryParam: false,
      categories: ['gem'],
      reset: true,
      showSpinner: true,
      options: [
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
        }
      ],
      showItem(e: GetEntry) {
        switch (this.value) {
          case null:
          case 'all':
            return true;
          default:
            return parseInt(this.value, 10) === e.gemLevel;
        }
      },
      onChange: () => this.sortEntries()
    },
    {
      id: 'quality',
      title: 'Quality',
      showTitle: true,
      inputType: 'dropdown',
      visible: false,
      disabled: false,
      value: null,
      defaultOptionIndex: 0,
      unsetDefaultQueryParam: true,
      setInitialQueryParam: false,
      categories: ['gem'],
      reset: true,
      showSpinner: true,
      options: [
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
      ],
      showItem(e: GetEntry) {
        switch (this.value) {
          case null:
          case 'all':
            return true;
          default:
            return parseInt(this.value, 10) === e.gemQuality;
        }
      },
      onChange: () => this.sortEntries()
    },
    {
      id: 'tier',
      title: 'Tier',
      showTitle: true,
      inputType: 'dropdown',
      visible: false,
      disabled: false,
      value: null,
      defaultOptionIndex: 0,
      unsetDefaultQueryParam: true,
      setInitialQueryParam: false,
      categories: ['map'],
      reset: true,
      showSpinner: true,
      options: [
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
      ],
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
      onChange: () => this.sortEntries()
    },
    {
      id: 'variant',
      title: 'Has variant',
      showTitle: true,
      inputType: 'radio',
      visible: false,
      disabled: false,
      value: null,
      defaultOptionIndex: 0,
      unsetDefaultQueryParam: true,
      setInitialQueryParam: false,
      categories: ['armour', 'weapon', 'flask', 'accessory', 'jewel'],
      reset: true,
      showSpinner: true,
      options: [
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
        }
      ],
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
      onChange: () => this.sortEntries()
    }
  ];

  constructor(private priceService: PriceService,
              private paginationService: PricePaginationService,
              private leagueService: LeagueService,
              private siteDataService: SiteDataService) {
  }

  public onQueryParamChange(league: League, category: Category): void {
    // hide certain search options depending on category
    CriteriaUtil.setState(this.criteria, category);

    this.rawEntries = null;
    // send null to force loading state on prices table
    this.entries$.next(null);
    this.paginationService.resetPagination();
    this.sort.state = null;
    this.sort.field = null;

    // send null to force loading state on group input
    const groupCriteria = CriteriaUtil.findCriteria(this.criteria, 'group');
    (groupCriteria.options as Subject<SearchOption[]>).next(null);

    // request new prices
    this.priceService.makeRequest(league, category).subscribe(entries => {
      // save the current entries
      this.rawEntries = entries;
      // extract groups from the entries and update criteria
      this.processPriceGroups(category, this.rawEntries);
      this.sortEntries();
    });
  }

  public getEntries(): Observable<GetEntry[]> {
    return this.entries$;
  }

  public filter(allEntries: GetEntry[]): GetEntry[] {
    // find entries visible after applying search criteria
    const enabledCriteria = CriteriaUtil.getEnabledCriteria(this.criteria);
    const matchingEntries = allEntries.filter(e => {
      return enabledCriteria.every(c => c.showItem(e));
    });

    // sort by
    const orderedEntries = matchingEntries.sort((a, b) => this.sortFn(a, b));
    // create pages
    return this.paginationService.page(allEntries, orderedEntries);
  }

  public loadNextPage() {
    if (!this.rawEntries) {
      return;
    }

    this.paginationService.incPage();
    this.sortEntries();
  }

  public sortEntries() {
    if (!this.rawEntries) {
      return;
    }

    // filter the entries including pagination and send them to subscribers
    this.entries$.next(this.filter(this.rawEntries));
  }

  public setSortParams(e: { id: string, state: SortArrowState }): void {
    this.sort.field = e.id;
    this.sort.state = e.state;
  }

  private processPriceGroups(category: Category, prices: GetEntry[]): void {
    // find all unique groups from prices as strings and map them to Group objects. categories being present is a
    // prerequisite to prices being requested. so this method will not run unless there's a category present
    const groups: Group[] = prices
      .map(p => p.group)
      .filter((g, i, s) => s.indexOf(g) === i)
      .map(gs => category.groups.find(g => g.name.toLowerCase() === gs));

    // find criteria that deals with groups
    const groupCriteria = CriteriaUtil.findCriteria(this.criteria, 'group');
    const searchOptions = groups.map(g => ({display: g.display, value: g.name}));

    // disable the input if there's only one group
    if (groups.length === 1) {
      groupCriteria.disabled = true;
    }

    // prepend the default value
    searchOptions.unshift({display: 'All', value: null});

    // set its options to the current groups
    (groupCriteria.options as Subject<SearchOption[]>).next(searchOptions);
  }

  private sortFn(a: GetEntry, b: GetEntry): number {
    if (!this.sort.field || !this.sort.state || this.sort.state === SortArrowState.NONE) {
      return a.mean === b.mean ? 0 : (a.mean > b.mean ? -1 : 1);
    }

    if (a[this.sort.field] === b[this.sort.field]) {
      return 0;
    }
    if (a[this.sort.field] > b[this.sort.field]) {
      return this.sort.state === SortArrowState.DESCENDING ? -1 : 1;
    }

    return this.sort.state === SortArrowState.ASCENDING ? -1 : 1;
  }

}
