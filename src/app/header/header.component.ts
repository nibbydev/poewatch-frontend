import {Component, OnInit} from '@angular/core';
import {NavLink} from './nav-link';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  private navLinks: NavLink[] = [];

  constructor() {
  }

  ngOnInit() {
    this.navLinks = [
      {id: 1, isNew: false, href: 'prices', display: 'Prices'},
      {id: 2, isNew: false, href: 'api',    display: 'API'},
      {id: 3, isNew: false, href: 'about',  display: 'About'},
    ];
  }
}
