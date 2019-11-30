import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'pw-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  url = 'http://github.com/siegrest/poewatch';
  date = new Date();

  constructor() {
  }

  ngOnInit() {
  }

}
