import { Component, Input, OnInit } from '@angular/core';
import { SearchCriteria } from '../data/search-criteria';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { PriceFilterService } from '../../services/price-filter.service';
import { SearchCriteriaService } from '../../services/search-criteria.service';
import { RouterHelperService } from '../../services/router-helper.service';

@Component({
  selector: 'app-reactive-input',
  templateUrl: './reactive-input.component.html',
  styleUrls: ['./reactive-input.component.css']
})
export class ReactiveInputComponent implements OnInit {
  @Input() private criteria: SearchCriteria;

  constructor(private activatedRoute: ActivatedRoute,
              private filterService: PriceFilterService,
              private criteriaService: SearchCriteriaService,
              private routerHelperService: RouterHelperService) {
  }

  ngOnInit() {
    // subscribe to query param changes
    // this.activatedRoute.queryParams.subscribe(params => this.onQueryChange(params));

    if (this.activatedRoute.snapshot.queryParamMap.has(this.criteria.id)) {
      this.criteria.value = this.activatedRoute.snapshot.queryParamMap.get(this.criteria.id);
    }

    // this.criteriaService.setDefaultCriteriaOption(this.criteria);
  }

  private onQueryChange(params: Params): void {
    // get the query param for this input
    const val = params[this.criteria.id];
    // if there was none
    if (!val) {
      this.criteria.value = null;
      return;
    }

    this.criteria.value = val.trim();
  }

  private onChange() {
    let val = this.criteria.value;
    if (val) {
      val = val.toString().trim();
    }

    const queryParams = {};
    queryParams[this.criteria.id] = val;

    this.routerHelperService.navigate(queryParams);
    this.filterService.sortEntries();
  }

}
