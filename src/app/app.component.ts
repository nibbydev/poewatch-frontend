import {Component} from '@angular/core';
import {NavLink} from './header/nav-link';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'poewatch-ng';
  navs: NavLink[] = [
    new NavLink()
  ];
}
