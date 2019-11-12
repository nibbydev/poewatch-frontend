import {Injectable} from '@angular/core';
import {GetEntry} from '../shared/data/get-entry';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {Category, Group} from '../shared/data/category';
import {PriceService} from './price.service';
import {League} from '../shared/data/league';
import {PricePaginationService} from './price-pagination.service';
import {SearchCriteriaService} from './search-criteria.service';
import {SearchOption} from '../shared/data/search-criteria';

@Injectable({
  providedIn: 'root'
})
export class PriceFilterService {
  private readonly entries$: BehaviorSubject<GetEntry[]> = new BehaviorSubject(null);
  private rawEntries: GetEntry[] = null;

  constructor(private priceService: PriceService,
              private paginationService: PricePaginationService,
              private searchCriteriaService: SearchCriteriaService) {
  }

  public getEntries(): Observable<GetEntry[]> {
    return this.entries$;
  }

  public onQueryParamChange(league: League, category: Category): void {
    // hide certain search options depending on category
    this.searchCriteriaService.setState(category);

    // send null to force loading state on prices table
    this.rawEntries = null;
    this.entries$.next(null);
    this.paginationService.resetPagination();

    // send null to force loading state on group input
    const groupCriteria = this.searchCriteriaService.getCriteria('group');
    (groupCriteria.options as Subject<SearchOption[]>).next(null);

    // request new prices
    this.priceService.makeRequest(league, category).subscribe(entries => {
      // save the current entries
      this.rawEntries = entries;
      // extract groups from the entries and update criteria
      this.processPriceGroups(category, this.rawEntries);
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

  public filter(allEntries: GetEntry[]): GetEntry[] {
    // find entries visible after applying search criteria
    const enabledCriteria = this.searchCriteriaService.getEnabledCriteria();
    const matchingEntries = allEntries.filter(e => {
      return enabledCriteria.every(c => c.showItem(e));
    });

    // create pages
    return this.paginationService.page(allEntries, matchingEntries);
  }


  private processPriceGroups(category: Category, prices: GetEntry[]): void {
    // find all unique groups from prices as strings and map them to Group objects. categories being present is a
    // prerequisite to prices being requested. so this method will not run unless there's a category present
    const groups: Group[] = prices
      .map(p => p.group)
      .filter((g, i, s) => s.indexOf(g) === i)
      .map(gs => category.groups.find(g => g.name.toLowerCase() === gs));

    // find criteria that deals with groups
    const groupCriteria = this.searchCriteriaService.getCriteria('group');
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

}
