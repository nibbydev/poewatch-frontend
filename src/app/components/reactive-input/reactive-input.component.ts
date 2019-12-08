import { Component, Input, OnInit } from '@angular/core';
import { Criteria, SearchOption } from '../../modules/criteria';
import { ActivatedRoute } from '@angular/router';
import { RouterHelperService } from '../../services/router-helper.service';
import { first, takeUntil } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';

@Component({
  selector: 'pw-reactive-input',
  templateUrl: './reactive-input.component.html',
  styleUrls: ['./reactive-input.component.css']
})
export class ReactiveInputComponent implements OnInit {
  @Input() private criteria: Criteria;
  private options: SearchOption[];

  constructor(private activatedRoute: ActivatedRoute,
              private routerHelperService: RouterHelperService) {
  }

  ngOnInit() {
    // no predefined options, load in user input as value
    if (!this.criteria.options) {
      const paramMap = this.activatedRoute.snapshot.queryParamMap;
      const paramValue = paramMap.has(this.criteria.id) ? paramMap.get(this.criteria.id) : null;

      if (paramValue) {
        this.criteria.value = paramValue;
      }

      if (this.criteria.onReady) {
        this.criteria.onReady();
      }

      return;
    }

    // options are observable, subscribe and verify
    if (this.criteria.options instanceof Observable) {
      const destroy$ = new Subject<boolean>();
      this.criteria.options.pipe(takeUntil(destroy$)).subscribe(o => {
        // some inputs send null to force loading state
        if (o === null) {
          return;
        }

        this.options = o;
        this.onInitVerifyAndSetOption(o);
        if (this.criteria.onReady) {
          this.criteria.onReady();
        }

        destroy$.next(true);
        destroy$.complete();
      });

      return;
    }

    // options are array, verify
    if (this.criteria.options instanceof Array) {
      this.options = this.criteria.options;
      this.onInitVerifyAndSetOption(this.criteria.options);
      if (this.criteria.onReady) {
        this.criteria.onReady();
      }
    }
  }

  private onInitVerifyAndSetOption(options: SearchOption[]): void {
    // get the initial query param
    const paramMap = this.activatedRoute.snapshot.queryParamMap;
    const paramValue = paramMap.has(this.criteria.id) ? paramMap.get(this.criteria.id) : null;

    // find matching and default options
    const matchingOption = options.find(o => o.value === paramValue);
    const defaultOption = this.criteria.defaultOptionIndex === null ? null : options[this.criteria.defaultOptionIndex];

    // set the query params
    const queryParams = {};
    if (matchingOption) {
      queryParams[this.criteria.id] = matchingOption.value;
    } else if (defaultOption) {
      queryParams[this.criteria.id] = defaultOption.value;
    } else {
      console.log('criteria:', this.criteria, 'options:', options, 'query value:', paramValue);
      throw new Error('Missing a match and a default value for a criteria. See above log for more info');
    }

    // set criteria value
    this.criteria.value = queryParams[this.criteria.id];

    // if user provided a query param or if criteria should set a query param on init
    if (paramValue !== null || this.criteria.setInitialQueryParam) {
      // navigate to either the default or matching param
      this.routerHelperService.navigate(queryParams);
    }
  }

  private onChange(): void {
    this.updateQueryParams();

    // call the onChange function if it is defined
    if (this.criteria.onChange) {
      this.criteria.onChange.call(this.criteria);
    }
  }

  private updateQueryParams() {
    const queryParams = {};
    queryParams[this.criteria.id] = this.criteria.value
      ? this.criteria.value.trim()
      : this.criteria.value;

    // if it was empty string
    if (!queryParams[this.criteria.id]) {
      queryParams[this.criteria.id] = undefined;
    }

    // if there are no options or no default option, skip checking
    if (this.criteria.defaultOptionIndex === null || !this.criteria.options) {
      this.routerHelperService.navigate(queryParams);
      return;
    }

    // options are observable, subscribe and verify
    if (this.criteria.options instanceof Observable) {
      this.criteria.options.pipe(first()).subscribe(o => {
        // some inputs send null to force loading state
        // todo .pipe(first()) should be replaced with takeUntil()?
        if (o === null) {
          return;
        }

        const defaultOption = o[this.criteria.defaultOptionIndex];
        this.updateParamsWithDefaultOption(defaultOption, queryParams);
      });

      return;
    }

    // options are array, verify
    if (this.criteria.options instanceof Array) {
      const defaultOption = this.criteria.options[this.criteria.defaultOptionIndex];
      this.updateParamsWithDefaultOption(defaultOption, queryParams);
    }
  }

  private updateParamsWithDefaultOption(defaultOption: SearchOption, queryParams: any): void {
    // if value is equal to default option, unset the query param
    if (this.criteria.unsetDefaultQueryParam && defaultOption && queryParams[this.criteria.id] === defaultOption.value) {
      queryParams[this.criteria.id] = undefined;
    }

    // todo: calls twice for league? bad for performance?
    this.routerHelperService.navigate(queryParams);
  }

}
