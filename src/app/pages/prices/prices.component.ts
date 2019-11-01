import {Component, OnInit} from '@angular/core';
import {PriceService} from '../../services/price.service';
import {LeagueService} from '../../services/league.service';
import {CategoryService} from '../../services/category.service';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {forkJoin, Observable} from 'rxjs';
import {GetEntry} from '../../services/data/get-entry';
import {League} from '../../services/data/league';
import {Category} from '../../services/data/category';
import {SearchCriteria} from './prices-search/search-option';
import {PriceSearchService} from '../../services/price-search.service';

@Component({
  selector: 'app-prices',
  templateUrl: './prices.component.html',
  styleUrls: ['./prices.component.css']
})
export class PricesComponent implements OnInit {
  private readonly searchCriteria: SearchCriteria[] = this.priceSearchService.getDefaultCriteria();
  private prices$: Observable<GetEntry[]>;
  private params: { league: League, category: Category } = {
    league: undefined,
    category: undefined
  };

  constructor(private leagueService: LeagueService,
              private categoryService: CategoryService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private pricesService: PriceService,
              private priceSearchService: PriceSearchService) {
  }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params => this.parseQueryParams(params));
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
        this.navigate({
          league: (matchingLeague || defaultLeague).name,
          category: (matchingCategory || defaultCategory).name
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

      // request new prices
      this.prices$ = this.pricesService.get(this.params);
    });
  }

  private navigate(targetParams: object): void {
    this.router.navigate(
      [],
      {
        relativeTo: this.activatedRoute,
        queryParams: targetParams,
        queryParamsHandling: 'merge'
      });
  }

}
