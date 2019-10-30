import {Component, Input, OnInit} from '@angular/core';
import {SearchTerm} from '../../../pages/prices/prices-search/search-term';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css']
})
export class InputComponent implements OnInit {
  @Input() private title: string;
  @Input() private param: string;
  @Input() private value: string;
  @Input() private options: SearchTerm[];

  constructor(private router: Router,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    if (this.activatedRoute.snapshot.queryParamMap.has(this.param)) {
      this.value = this.activatedRoute.snapshot.queryParamMap.get(this.param);
    }
  }

  private onChange() {
    let val = this.value.trim();
    if (!val) {
      val = undefined;
    }

    const queryParams = {};
    queryParams[this.param] = val;

    this.router.navigate(
      [],
      {
        relativeTo: this.activatedRoute,
        queryParams,
        queryParamsHandling: 'merge'
      });
  }
}
