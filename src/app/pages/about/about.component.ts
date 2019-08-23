import { Component, OnInit } from '@angular/core';
import { AboutItem } from './about-item';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
  private aboutItems: AboutItem[] = [
    {
      id: 1,
      question: 'Where do you get the prices?',
      answer: 'The official stash API over from pathofexile.com. ' +
        'Prices are automatically generated from the items players publicly list for sale.'
    },
    {
      id: 2,
      question: 'How up to date are the prices?',
      answer: 'Prices are recalculated within 10 minutes intervals. ' +
        'Prices on the website are always the most recent unless stated otherwise.'
    },
    {
      id: 3,
      question: 'What do the change, daily and total columns mean?',
      answer: 'Change refers to how much the price has changed when comparing the price right now and 7 days ago. ' +
        'Daily means how many of that item is listed every 24 hours. ' +
        'Total is the total number of times the item has been listed during that league.'
    },
  ];

  constructor() {
  }

  ngOnInit() {}
}
