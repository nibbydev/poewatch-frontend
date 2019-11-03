import {Component, OnInit} from '@angular/core';
import {PriceService} from '../../services/price.service';
import {LeagueService} from '../../services/league.service';
import {CategoryService} from '../../services/category.service';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {forkJoin, Observable} from 'rxjs';
import {GetEntry} from '../../services/data/get-entry';
import {League} from '../../services/data/league';
import {Category, Group} from '../../services/data/category';
import {CriteriaType, SearchOption} from './prices-search/search-option';
import {PriceFilterService} from '../../services/price-filter.service';

@Component({
  selector: 'app-prices',
  templateUrl: './prices.component.html',
  styleUrls: ['./prices.component.css']
})
export class PricesComponent implements OnInit {
  private params: { league: League, category: Category } = {
    league: undefined,
    category: undefined
  };

  constructor(private leagueService: LeagueService,
              private categoryService: CategoryService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private pricesService: PriceService,
              private priceFilterService: PriceFilterService) {
  }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params => this.parseQueryParams(params));
    this.pricesService.getEntries().subscribe(prices => this.processPriceGroups(prices));
    this.leagueService.entries$.subscribe(leagues => this.processLeagues(leagues));
  }

  private parseQueryParams(params: Params): void {
    const queryLeague = params.league ? params.league.trim() : '';
    const queryCategory = params.category ? params.category.trim() : '';

    // get leagues and categories
    forkJoin([this.leagueService.entries$, this.categoryService.entries$]).subscribe(result => {
      const leagues = result[0];
      const categories = result[1];

      // find entries that match query parameters
      const matchingLeague = leagues.find(league => league.name.toLowerCase() === queryLeague.toLowerCase());
      const matchingCategory = categories.find(category => category.name.toLowerCase() === queryCategory.toLowerCase());

      // find default entries
      const defaultLeague = leagues[leagues.length - 1];
      const defaultCategory = categories.find(category => category.name === 'currency');

      // use default options if there wasn't a match
      if (!matchingLeague || !matchingCategory) {
        this.params.league = undefined;
        this.router.navigate(
          [],
          {
            relativeTo: this.activatedRoute,
            queryParams: {
              league: (matchingLeague || defaultLeague).name,
              category: (matchingCategory || defaultCategory).name
            },
            queryParamsHandling: 'merge'
          });
        return;
      }

      // todo: navigate to match if capitalization does not match

      // don't request prices if params haven't changed
      if (this.params.league === matchingLeague && this.params.category === matchingCategory) {
        return;
      }

      // save current params for the check above
      this.params = {
        league: matchingLeague,
        category: matchingCategory
      };

      this.priceFilterService.filterCriteria(matchingCategory);
      // request new prices
      this.pricesService.makeRequest(this.params);
    });
  }

  private processPriceGroups(prices?: GetEntry[]): void {
    if (!prices) {
      return;
    }

    // find all unique groups from prices as strings and map them to Group objects. categories being present is a
    // prerequisite to prices being requested. so this method will not run unless there's a category present
    const groups: Group[] = prices
      .map(p => p.group)
      .filter((g, i, s) => s.indexOf(g) === i)
      .map(gs => this.params.category.groups.find(g => g.name.toLowerCase() === gs));

    // find criteria that deals with groups
    const groupCriteria = this.priceFilterService.getCriteria(CriteriaType.GROUP);
    const searchOptions = groups.map(g => new SearchOption(g.display, g.name));

    // set its options to the current groups
    groupCriteria.options = new Observable(o => {
      o.next(searchOptions);
      o.complete();
    });

    groupCriteria.value = searchOptions[0].value;
  }

  private processLeagues(leagues: League[]): void {
    // find criteria that deals with leagues
    const leagueCriteria = this.priceFilterService.getCriteria(CriteriaType.LEAGUE);
    const searchOptions = leagues.map(g => new SearchOption(g.display, g.name)).reverse();

    // set its options to the current groups
    leagueCriteria.options = new Observable(o => {
      o.next(searchOptions);
      o.complete();
    });

    leagueCriteria.value = searchOptions[0].value;
  }
}
