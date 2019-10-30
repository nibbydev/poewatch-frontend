import {Component, OnInit} from '@angular/core';
import {PriceService} from '../../services/price.service';
import {LeagueService} from '../../services/league.service';
import {CategoryService} from '../../services/category.service';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {GetEntry} from '../../services/data/get-entry';

@Component({
  selector: 'app-prices',
  templateUrl: './prices.component.html',
  styleUrls: ['./prices.component.css']
})
export class PricesComponent implements OnInit {
  private prices$: Observable<GetEntry[]>;
  private params = {
    league: undefined,
    category: undefined
  };

  constructor(private leagueService: LeagueService,
              private categoryService: CategoryService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private pricesService: PriceService) {
  }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params => this.parseQueryParams(params));
  }

  private parseQueryParams(params: Params): void {
    const queryLeague = params.league ? params.league.trim() : '';
    const queryCategory = params.category ? params.category.trim() : '';

    this.leagueService.entries$.subscribe(leagues => {
      const defaultLeague = leagues[leagues.length - 1];

      // no category was provided, use default
      if (!queryLeague) {
        this.params.league = undefined;
        this.navigate({league: defaultLeague.name});
        return;
      }

      // find league corresponding to query param
      const matchingLeague = leagues.find(league => league.name.toLowerCase() === queryLeague.toLowerCase());
      if (!matchingLeague) {
        this.params.league = undefined;
        this.navigate({league: defaultLeague.name});
        return;
      }

      // if the capitalization does not match
      if (matchingLeague.name !== queryLeague) {
        this.params.league = undefined;
        this.navigate({league: matchingLeague.name});
        return;
      }

      // all's good, save the league name
      this.params.league = matchingLeague;
      this.makeRequest();
    });

    this.categoryService.entries$.subscribe(categories => {
      const defaultCategory = categories.find(category => category.name === 'currency');

      // no category was provided, use default
      if (!queryCategory) {
        this.params.category = undefined;
        this.navigate({category: defaultCategory.name});
        return;
      }

      // find category corresponding to query param
      const matchingCategory = categories.find(category => category.name.toLowerCase() === queryCategory.toLowerCase());
      if (!matchingCategory) {
        this.params.category = undefined;
        this.navigate({category: defaultCategory.name});
        return;
      }

      // if the capitalization does not match
      if (matchingCategory.name !== queryCategory) {
        this.params.category = undefined;
        this.navigate({category: defaultCategory.name});
        return;
      }

      // all's good, save the league name
      this.params.category = matchingCategory;
      this.makeRequest();
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

  private makeRequest() {
    if (!this.params.league || !this.params.category) {
      return;
    }

    this.prices$ = this.pricesService.get(this.params.league.name, this.params.category.name);
  }
}
