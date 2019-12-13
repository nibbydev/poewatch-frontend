import { Injectable } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Params, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RouterHelperService {

  constructor(private router: Router,
              private activatedRoute: ActivatedRoute) {
  }

  public navigate(params: Params, skipLocationChange: boolean = false): void {
    this.router.navigate(
      [],
      {
        relativeTo: this.activatedRoute,
        queryParams: params,
        queryParamsHandling: 'merge',
        skipLocationChange
      } as NavigationExtras);
  }
}
