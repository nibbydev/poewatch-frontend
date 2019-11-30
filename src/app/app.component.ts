import {Component, OnInit} from '@angular/core';
import {Router, RoutesRecognized} from '@angular/router';

@Component({
  selector: 'pw-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  private pageTitle: string;

  constructor(private router: Router) {
  }

  ngOnInit() {
    this.router.events.subscribe((data) => {
      if (data instanceof RoutesRecognized) {
        this.pageTitle = data.state.root.firstChild.data.pageTitle;
      }
    });
  }
}
