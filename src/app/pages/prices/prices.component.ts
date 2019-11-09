import {Component, OnInit} from '@angular/core';
import {LeagueService} from '../../services/league.service';
import {CategoryService} from '../../services/category.service';
import {ActivatedRoute, Event, NavigationStart, Params, Router} from '@angular/router';
import {forkJoin} from 'rxjs';
import {PriceFilterService} from '../../services/price-filter.service';
import {SearchCriteriaService} from '../../services/search-criteria.service';
import {RouterHelperService} from '../../services/router-helper.service';

@Component({
  selector: 'app-prices',
  templateUrl: './prices.component.html',
  styleUrls: ['./prices.component.css']
})
export class PricesComponent implements OnInit {

  constructor(private leagueService: LeagueService,
              private categoryService: CategoryService,
              private activatedRoute: ActivatedRoute,
              private priceFilterService: PriceFilterService,
              private searchCriteriaService: SearchCriteriaService,
              private routerHelperService: RouterHelperService,
              private router: Router) {
  }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params => this.parseQueryParams(params));
    this.router.events.subscribe((event: NavigationStart) => {
      if (!(event instanceof NavigationStart)) {
        return;
      }
      if (event.url !== '/prices') {
        return;
      }

      this.searchCriteriaService.resetAll();
    });
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
        this.routerHelperService.navigate({
          league: (matchingLeague || defaultLeague).name,
          category: (matchingCategory || defaultCategory).name
        });
        return;
      }

      // todo: navigate to match if capitalization does not match
      this.priceFilterService.onQueryParamChange(matchingLeague, matchingCategory);
    });
  }

}
