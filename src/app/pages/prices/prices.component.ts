import {Component, OnInit} from '@angular/core';
import {LeagueService} from '../../services/league.service';
import {CategoryService} from '../../services/category.service';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {forkJoin} from 'rxjs';
import {PriceFilterService} from '../../services/price-filter.service';
import {SearchCriteriaService} from '../../services/search-criteria.service';
import {InputType} from '../../shared/search-option';

@Component({
  selector: 'app-prices',
  templateUrl: './prices.component.html',
  styleUrls: ['./prices.component.css']
})
export class PricesComponent implements OnInit {

  constructor(private leagueService: LeagueService,
              private categoryService: CategoryService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private priceFilterService: PriceFilterService,
              private searchCriteriaService: SearchCriteriaService) {
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
      this.priceFilterService.onQueryParamChange(matchingLeague, matchingCategory);
    });
  }

  public getInputTypes() {
    return InputType;
  }
}
