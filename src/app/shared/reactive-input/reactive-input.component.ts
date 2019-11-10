import {Component, Input, OnInit} from '@angular/core';
import {SearchCriteria} from '../data/search-criteria';
import {ActivatedRoute} from '@angular/router';
import {PriceFilterService} from '../../services/price-filter.service';
import {RouterHelperService} from '../../services/router-helper.service';

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
