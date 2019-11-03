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


  public filter(entries: GetEntry[]): GetEntry[] {
    // find entries visible after applying search criteria
    const enabledCriteria = this.getEnabledCriteria();
    const visibleEntries = entries.filter(e => {
      return enabledCriteria.some(c => this.isMatch(e, c));
    });

    // create pages
    return this.paginationService.page(entries, visibleEntries);
  }

  private isMatch(e: GetEntry, c: SearchCriteria): boolean {

    /*if (e.daily < 50) {
      return false;
    }*/


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

    // set its options to the current groups
    groupCriteria.options = new Observable(o => {
      o.next(searchOptions);
      o.complete();
    });

    groupCriteria.value = searchOptions[0].value;
  }

}
