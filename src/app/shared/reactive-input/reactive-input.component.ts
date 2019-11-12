import {Component, Input, OnInit} from '@angular/core';
import {SearchCriteria} from '../data/search-criteria';
import {ActivatedRoute} from '@angular/router';
import {PriceFilterService} from '../../services/price-filter.service';
import {RouterHelperService} from '../../services/router-helper.service';
import {first} from 'rxjs/operators';

@Component({
  selector: 'app-reactive-input',
  templateUrl: './reactive-input.component.html',
  styleUrls: ['./reactive-input.component.css']
})
export class ReactiveInputComponent implements OnInit {
  @Input() private criteria: SearchCriteria;

  constructor(private activatedRoute: ActivatedRoute,
              private filterService: PriceFilterService,
              private routerHelperService: RouterHelperService) {
  }

  ngOnInit() {
    if (this.activatedRoute.snapshot.queryParamMap.has(this.criteria.id)) {
      this.criteria.value = this.activatedRoute.snapshot.queryParamMap.get(this.criteria.id);
    }
  }

  private onChange() {
    const queryParams = {};
    queryParams[this.criteria.id] = this.criteria.value
      ? this.criteria.value.trim()
      : this.criteria.value;

    // if it was empty string
    if (!queryParams[this.criteria.id]) {
      queryParams[this.criteria.id] = undefined;
    }

    // if value is equal to default option, unset the query param
    if (this.criteria.defaultOptionIndex === null || this.criteria.options === null) {
      // todo: calls twice for league. bad for performance?
      this.routerHelperService.navigate(queryParams);
      this.filterService.sortEntries();
      return;
    }

    // get options
    this.criteria.options.pipe(first()).subscribe(o => {
      // group sends null to force loading state on input
      if (o === null) {
        return;
      }

      const defaultOption = o[this.criteria.defaultOptionIndex];
      if (defaultOption && queryParams[this.criteria.id] === defaultOption.value) {
        queryParams[this.criteria.id] = undefined;
      }

      // todo: calls twice for league. bad for performance?
      this.routerHelperService.navigate(queryParams);
      this.filterService.sortEntries();
    });
  }

}
