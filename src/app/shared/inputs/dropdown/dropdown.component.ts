import {Component, Input, OnInit} from '@angular/core';
import {SearchCriteria} from '../../../pages/prices/search-option';
import {ActivatedRoute, Router} from '@angular/router';
import {PriceFilterService} from '../../../services/price-filter.service';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.css']
})
export class DropdownComponent implements OnInit {
  @Input() private criteria: SearchCriteria;

  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private filterService: PriceFilterService) {
  }

  ngOnInit() {
    if (this.activatedRoute.snapshot.queryParamMap.has(this.criteria.id)) {
      this.criteria.value = this.activatedRoute.snapshot.queryParamMap.get(this.criteria.id);
    }
  }

  private onChange() {
    const queryParams = {};
    queryParams[this.criteria.id] = this.criteria.value;

    this.router.navigate(
      [],
      {
        relativeTo: this.activatedRoute,
        queryParams,
        queryParamsHandling: 'merge'
      });

    this.filterService.sortEntries();
  }
}
