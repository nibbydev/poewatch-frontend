import {Component, OnInit} from '@angular/core';
import {Route, Router} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private router: Router) {
  }

  ngOnInit() {
  }

  private getFilteredRoutes(): Route[] {
    return this.router.config.filter((route) => route.data.enabled);
  }

  private isCurrentRoute(path: string): boolean {
    const queryIndex = this.router.url.indexOf('?');

    if (queryIndex < 0) {
      return this.router.url.substring(1) === path;
    } else {
      return this.router.url.substring(1, queryIndex) === path;
    }
  }
}
