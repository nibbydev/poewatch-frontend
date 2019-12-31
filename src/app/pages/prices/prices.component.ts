import { Component, OnDestroy, OnInit } from '@angular/core';
import { LeagueService } from '../../services/api/league.service';
import { CategoryService } from '../../services/api/category.service';
import { ActivatedRoute, Params } from '@angular/router';
import { forkJoin, Subscription } from 'rxjs';
import { PriceFilterService } from '../../services/price-filter.service';
import { RouterHelperService } from '../../services/router-helper.service';
import { League } from '../../modules/api/league';
import { Category } from '../../modules/api/category';
import { first } from 'rxjs/operators';
import { PriceSearchCriteria } from '../../modules/criteria';
import { CriteriaUtil } from '../../utility/criteria-util';

@Component({
  selector: 'pw-prices',
  templateUrl: './prices.component.html',
  styleUrls: ['./prices.component.css']
})
export class PricesComponent implements OnInit, OnDestroy {
  private subscription: Subscription;
  private readonly params: { league: League, category: Category } = {
    league: undefined,
    category: undefined
  };

  constructor(private leagueService: LeagueService,
              private categoryService: CategoryService,
              private activatedRoute: ActivatedRoute,
              public priceFilterService: PriceFilterService,
              private routerHelperService: RouterHelperService) {
  }

  ngOnInit() {
    this.resetParams();
    CriteriaUtil.resetAll(this.priceFilterService.criteria);
    this.subscription = this.activatedRoute.queryParams.subscribe(params => this.parseQueryParams(params));
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  public getEnabledCriteria(): PriceSearchCriteria[] {
    return CriteriaUtil.getEnabledCriteria(this.priceFilterService.criteria);
  }

  public resetParams(): void {
    this.params.league = undefined;
    this.params.category = undefined;
  }

  private parseQueryParams(params: Params): void {
    const queryLeague = params.league ? params.league.trim() : '';
    const queryCategory = params.category ? params.category.trim() : '';

    // get leagues and categories
    forkJoin([this.leagueService.entries$, this.categoryService.entries$]).pipe(first()).subscribe(result => {
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
        this.routerHelperService.navigate({
          league: (matchingLeague || defaultLeague).name,
          category: (matchingCategory || defaultCategory).name
        }, true);
        return;
      }

      // don't request prices if params haven't changed
      if (this.params.league === matchingLeague && this.params.category === matchingCategory) {
        return;
      }

      // save current params
      this.params.league = matchingLeague;
      this.params.category = matchingCategory;

      // todo: navigate to match if capitalization does not match
      this.priceFilterService.onQueryParamChange(matchingLeague, matchingCategory);
    });
  }

}
