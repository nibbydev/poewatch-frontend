import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RouterHelperService {

  constructor(private router: Router,
              private activatedRoute: ActivatedRoute) {
  }

  public navigate(params: {}): void {
    this.router.navigate(
      [],
      {
        relativeTo: this.activatedRoute,
        queryParams: params,
        queryParamsHandling: 'merge'
      });
  }
}
