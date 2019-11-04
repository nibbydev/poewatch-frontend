import {Injectable} from '@angular/core';
import {GetEntry} from './data/get-entry';
import {Observable, Subject} from 'rxjs';
import {CriteriaType, InputType, SearchCriteria, SearchOption} from '../pages/prices/prices-search/search-option';
import {Category, Group} from './data/category';
import {PriceService} from './price.service';
import {League} from './data/league';
import {LeagueService} from './league.service';
import {PricePaginationService} from './price-pagination.service';

@Injectable({
  providedIn: 'root'
})
export class PriceFilterService {
  private readonly entries$: Subject<GetEntry[]> = new Subject();
  private rawEntries: GetEntry[] = null;

  private readonly params: { league: League, category: Category } = {
    league: undefined,
    category: undefined
  };
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
          value: true
        }
      ]),
      showItem(e: GetEntry) {
        // if 'Show' is selected, do not hide any item. otherwise hide if there's a low amount of items
        return this.value ? true : e.daily >= 10 && e.current >= 10;
      },
    },
    {
      id: CriteriaType.GROUP,
      title: 'Group',
      inputType: InputType.DROPDOWN,
      enabled: true,
      value: null,
      categories: null,
      options: null,
      showItem(e: GetEntry) {
        if (this.value === null) {
          return true;
        }

        return e.group === this.value;
      },
    },
    {
      id: CriteriaType.LEAGUE,
      title: 'League',
      inputType: InputType.DROPDOWN,
      enabled: true,
      value: null,
      categories: null,
      options: null,
      showItem(e: GetEntry) {
        return true;
      },
    },
    {
      id: CriteriaType.SEARCH,
      title: 'Search',
      inputType: InputType.INPUT,
      enabled: true,
      value: null,
      categories: null,
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
      id: CriteriaType.LINKS,
      title: 'Links',
      inputType: InputType.RADIO,
      enabled: true,
      value: null,
      categories: ['weapon', 'armour'],
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
        if (this.value !== e.linkCount) {
          return false;
        }

        return true;
      },
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
      id: CriteriaType.INFLUENCE,
      title: 'Influence',
      inputType: InputType.DROPDOWN,
      enabled: true,
      value: null,
      categories: ['base'],
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
      },
    },
  ];

  constructor(private leagueService: LeagueService,
              private priceService: PriceService,
              private paginationService: PricePaginationService) {
    this.leagueService.entries$.subscribe(leagues => this.processLeagues(leagues));
  }


  public getEntries(): Observable<GetEntry[]> {
    return this.entries$;
  }

  public requestNewPrices(league: League, category: Category): void {
    // don't request prices if params haven't changed
    if (this.params.league === league && this.params.category === category) {
      return;
    }

    // save current params
    this.params.league = league;
    this.params.category = category;

    // hide certain search options depending on category
    this.filterCriteria(category);

    // send null to force loading state on prices table
    this.rawEntries = null;
    this.entries$.next(null);
    this.paginationService.resetPagination();

    // request new prices
    this.priceService.makeRequest(league, category).subscribe(entries => {
      // save the current entries
      this.rawEntries = entries;
      // extract groups from the entries and update criteria
      this.processPriceGroups(this.rawEntries);
      // filter the entries including pagination and send them to subscribers
      this.entries$.next(this.filter(this.rawEntries));
    });
  }


  public loadNextPage() {
    if (!this.rawEntries) {
      return;
    }

    this.paginationService.incPage();
    this.entries$.next(this.filter(this.rawEntries));
  }

  public sortEntries() {
    if (!this.rawEntries) {
      return;
    }

    this.entries$.next(this.filter(this.rawEntries));
  }

  public filter(entries: GetEntry[]): GetEntry[] {
    // find entries visible after applying search criteria
    const enabledCriteria = this.getEnabledCriteria();
    const visibleEntries = entries.filter(e => {
      return enabledCriteria.every(c => c.showItem(e));
    });

    // create pages
    return this.paginationService.page(entries, visibleEntries);
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


  private processLeagues(leagues: League[]): void {
    // find criteria that deals with leagues
    const leagueCriteria = this.getCriteria(CriteriaType.LEAGUE);
    const searchOptions = leagues.map(g => new SearchOption(g.display, g.name)).reverse();

    // set its options to the current groups
    leagueCriteria.options = new Observable(o => {
      o.next(searchOptions);
      o.complete();
    });

    leagueCriteria.value = searchOptions[0].value;
  }

  private processPriceGroups(prices?: GetEntry[]): void {
    // find all unique groups from prices as strings and map them to Group objects. categories being present is a
    // prerequisite to prices being requested. so this method will not run unless there's a category present
    const groups: Group[] = prices
      .map(p => p.group)
      .filter((g, i, s) => s.indexOf(g) === i)
      .map(gs => this.params.category.groups.find(g => g.name.toLowerCase() === gs));

    // find criteria that deals with groups
    const groupCriteria = this.getCriteria(CriteriaType.GROUP);
    const searchOptions = groups.map(g => new SearchOption(g.display, g.name));

    // prepend the default value
    searchOptions.unshift(new SearchOption('All', null));

    // set its options to the current groups
    groupCriteria.options = new Observable(o => {
      o.next(searchOptions);
      o.complete();
    });
  }

}
