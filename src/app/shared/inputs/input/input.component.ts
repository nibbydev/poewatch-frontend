import {Component, Input, OnInit} from '@angular/core';
import {SearchCriteria} from '../../../pages/prices/prices-search/search-option';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css']
})
export class InputComponent implements OnInit {
  @Input() private criteria: SearchCriteria;

  constructor(private router: Router,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    if (this.activatedRoute.snapshot.queryParamMap.has(this.criteria.id)) {
      this.criteria.value = this.activatedRoute.snapshot.queryParamMap.get(this.criteria.id);
    }
  }

  private onChange() {
    let val = this.criteria.value.trim();
    if (!val) {
      val = undefined;
    }

    const queryParams = {};
    queryParams[this.criteria.id] = val;

    this.router.navigate(
      [],
      {
        relativeTo: this.activatedRoute,
        queryParams,
        queryParamsHandling: 'merge'
      });
  }
}
