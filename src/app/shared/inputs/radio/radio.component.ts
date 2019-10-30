import {Component, Input, OnInit} from '@angular/core';
import {SearchTerm} from '../../../pages/prices/prices-search/search-term';
import {ActivatedRoute, Router} from '@angular/router';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-radio',
  templateUrl: './radio.component.html',
  styleUrls: ['./radio.component.css']
})
export class RadioComponent implements OnInit {
  @Input() private title: string;
  @Input() private param: string;
  @Input() private value: any;
  @Input() private options: Observable<SearchTerm[]>;

  constructor(private router: Router,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    if (this.activatedRoute.snapshot.queryParamMap.has(this.param)) {
      this.value = this.activatedRoute.snapshot.queryParamMap.get(this.param);
    }
  }

  private onChange() {
    const queryParams = {};
    queryParams[this.param] = this.value;

    this.router.navigate(
      [],
      {
        relativeTo: this.activatedRoute,
        queryParams,
        queryParamsHandling: 'merge'
      });
  }
}
