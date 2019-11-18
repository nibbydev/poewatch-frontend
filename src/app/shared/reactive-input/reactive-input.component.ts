import {Component, Input, OnInit} from '@angular/core';
import {Criteria, SearchOption} from '../data/criteria';
import {ActivatedRoute} from '@angular/router';
import {RouterHelperService} from '../../services/router-helper.service';
import {first, takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';

@Component({
  selector: 'app-reactive-input',
  templateUrl: './reactive-input.component.html',
  styleUrls: ['./reactive-input.component.css']
})
export class ReactiveInputComponent implements OnInit {
  @Input() private criteria: Criteria;

  constructor(private activatedRoute: ActivatedRoute,
              private routerHelperService: RouterHelperService) {
  }

  ngOnInit() {
    // if there are options, subscribe and verify
    if (this.criteria.options) {
      const destroy$ = new Subject<boolean>();
      this.criteria.options.pipe(takeUntil(destroy$)).subscribe(o => {
        if (o === null) {
          return;
        }

        this.onInitLoadOptions(o);
        destroy$.next(true);
        destroy$.complete();
      });

      return;
    }


    // const paramMap = this.activatedRoute.snapshot.queryParamMap;
    // if (paramMap.has(this.criteria.id)) {
    //   this.criteria.value = paramMap.get(this.criteria.id);
    //   return;
    // }
    //
    //
    // if (this.criteria.setInitialQueryParam && this.criteria.defaultOptionIndex !== null) {
    //   const destroy$ = new Subject<boolean>();
    //   this.criteria.options.pipe(takeUntil(destroy$)).subscribe(o => {
    //     if (o === null) {
    //       return;
    //     }
    //
    //     const defaultOption = o[this.criteria.defaultOptionIndex];
    //     this.criteria.value = defaultOption.value;
    //
    //     const queryParams = {};
    //     queryParams[this.criteria.id] = defaultOption.value;
    //
    //     this.routerHelperService.navigate(queryParams);
    //     destroy$.next(true);
    //     destroy$.complete();
    //   });
    // }

  }

  private onInitLoadOptions(options: SearchOption[]): void {
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

    // if value is equal to default option, unset the query param
    if (this.criteria.defaultOptionIndex === null || this.criteria.options === null) {
      // todo: calls twice for league. bad for performance?
      this.routerHelperService.navigate(queryParams);
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
    });
  }

}
