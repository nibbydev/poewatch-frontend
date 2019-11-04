import {Injectable} from '@angular/core';
import {GetEntry} from './data/get-entry';
import {Observable, Subject} from 'rxjs';
import {CriteriaType, SearchOption} from '../pages/prices/search-option';
import {Category, Group} from './data/category';
import {PriceService} from './price.service';
import {League} from './data/league';
import {LeagueService} from './league.service';
import {PricePaginationService} from './price-pagination.service';
import {SearchCriteriaService} from './search-criteria.service';

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

  constructor(private leagueService: LeagueService,
              private priceService: PriceService,
              private paginationService: PricePaginationService,
              private searchCriteriaService: SearchCriteriaService) {
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
    this.searchCriteriaService.setCriteriaEnabled(category);

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
    const enabledCriteria = this.searchCriteriaService.getEnabledCriteria();
    const visibleEntries = entries.filter(e => {
      return enabledCriteria.every(c => c.showItem(e));
    });

    // create pages
    return this.paginationService.page(entries, visibleEntries);
  }


  private processLeagues(leagues: League[]): void {
    // find criteria that deals with leagues
    const leagueCriteria = this.searchCriteriaService.getCriteria(CriteriaType.LEAGUE);
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
    const groupCriteria = this.searchCriteriaService.getCriteria(CriteriaType.GROUP);
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
