import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-front',
  templateUrl: './front.component.html',
  styleUrls: ['./front.component.css']
})
export class FrontComponent implements OnInit {

  private faq = [
    {
      title: 'Where do you get the prices? ',
      text: 'The official stash API over from pathofexile.com. Prices are automatically generated from the ' +
        'items players publicly list for sale.'
    },
    {
      title: 'How up to date are the prices? ',
      text: 'Prices are recalculated within 10 minutes intervals. Prices on the website are always the most ' +
        'recent unless stated otherwise.'
    },
    {
      title: 'What do the \'change\', \'daily\' and \'total\' columns mean? ',
      text: 'Change refers to how much the price has changed when comparing the price right now and 7 days ago. ' +
        'Daily means how many of that item is listed every 24 hours. Total is the total number of times the ' +
        'item has been listed during that league.'
    },
    {
      title: 'The currency page is cluttered with too many different items. ',
      text: 'Use the Group search option to filter based on Currency, Essences and other groups.'
    },
    {
      title: 'How do you acquire account and character names? ',
      text: 'Through the stash API. Meaning that if a player has listed an item in a public stash tab, that ' +
        'character is recorded.'
    },
    {
      title: 'Why doesn\'t a character from X league show up in the characters page? ',
      text: 'Only users who have listed something on sale using public stash tabs have that specific character ' +
        'recorded.'
    },
    {
      title: 'Item X has an incredibly high price at league start. Why? ',
      text: 'Quite often the first person to find a particular item during a new league will list it for much ' +
        'more than it\'s actually worth.'
    },
    {
      title: 'Can you make feature X on this site less frustrating to use? ',
      text: 'Do let me know and I\'ll see how it can be improved.'
    },
    {
      title: 'What are the API limitations? ',
      text: 'Based on fair use. Most endpoints are cached for 1 minute. Excessively requesting resources will ' +
        'enforce a delay between requests'
    },
    {
      title: 'Some of the pages don\'t work with Internet Explorer ',
      text: 'More like Internet Explorer doesn\'t work with some of the pages. But seriously, it\'s an outdated ' +
        'browser. You should upgrade to something newer.'
    },
    {
      title: 'I\'m creating a new tool, but I\'m unsure about X or have a question about Y. ',
      text: 'Drop a message in the contact box and I\'ll get back to you.'
    }
  ];

  private about = [
    {
      title: 'Overview',
      text: 'PoeWatch is a Path of Exile statistics and price data collection page that\'s been in the works ' +
        'since 2017. It gathers data over time for various items (such as uniques, gems, currency, you name it) ' +
        'from public trade listings and finds the average prices. The site is actively in development and ' +
        'welcomes any feedback users may have.'
    },
    {
      title: 'The general idea',
      text: 'The general goal was to make a statistics website with everything in one place. Users can check ' +
        'prices of almost any item type from the current or past leagues and look up character names.'
    },
    {
      title: 'The API',
      text: 'Of course, all the data displayed here can be accessed through various APIs. Currently available ' +
        'interfaces can be found under the API page.'
    },
  ];

  constructor() {
  }

  ngOnInit() {
  }

}
