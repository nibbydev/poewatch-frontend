import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {LeagueService} from '../../../services/league.service';
import {CategoryService} from '../../../services/category.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {SearchCriteria, SearchTerm} from './search-term';

/*

TODO: This class is an absolute mess

*/

@Component({
  selector: 'app-prices-search',
  templateUrl: './prices-search.component.html',
  styleUrls: ['./prices-search.component.css']
})
export class PricesSearchComponent implements OnInit {
  // todo: remove me
  @Output() private readonly searchEmitter: EventEmitter<string> = new EventEmitter<string>();

  private searchCriteria: SearchCriteria[] = [
    {
      id: 'confidence',
      title: 'Confidence',
      enabled: true,
      value: null,
      options: this.getSearchTermsAsObservable([
        {
          display: 'Hide',
          value: null
        },
        {
          display: 'Show',
          value: 'show'
        }
      ])
    },
    {
      id: 'group',
      title: 'Group',
      enabled: true,
      value: null,
      options: this.getGroupsAsObservableSearchTerms()
    },
    {
      id: 'league',
      title: 'League',
      enabled: true,
      value: null,
      options: this.getLeaguesAsObservableSearchTerms()
    },
    {
      id: 'search',
      title: 'Search',
      enabled: true,
      value: null,
      options: null
    },
    {
      id: 'rarity',
      title: 'Rarity',
      enabled: true,
      value: null,
      options: this.getSearchTermsAsObservable([
        {
          display: 'All',
          value: null
        },
        {
          display: 'Unique',
          value: 'unique'
        },
        {
          display: 'Relic',
          value: 'relic'
        },
      ])
    },
    {
      id: 'links',
      title: 'Links',
      enabled: true,
      value: null,
      options: this.getSearchTermsAsObservable([
        {
          display: 'All links',
          value: null
        },
        {
          display: 'No links',
          value: 'none'
        },
        {
          display: 'Five links',
          value: '5'
        },
        {
          display: 'Six links',
          value: '6'
        },
      ])
    },
    {
      id: 'ilvl',
      title: 'Ilvl',
      enabled: true,
      value: null,
      options: this.getSearchTermsAsObservable([
        {
          display: 'All',
          value: null
        },
        {
          display: '82',
          value: '82'
        },
        {
          display: '83',
          value: '83'
        },
        {
          display: '84',
          value: '84'
        },
        {
          display: '85',
          value: '85'
        },
        {
          display: '86+',
          value: '86'
        },
      ])
    },
    {
      id: 'influence',
      title: 'Influence',
      enabled: true,
      value: null,
      options: this.getSearchTermsAsObservable([
        {
          display: 'All',
          value: null
        },
        {
          display: 'None',
          value: 'none'
        },
        {
          display: 'Either',
          value: 'either'
        },
        {
          display: 'Shaper',
          value: 'shaper'
        },
        {
          display: 'Elder',
          value: 'elder'
        },
      ])
    },
    {
      id: 'corruption',
      title: 'Corruption',
      enabled: true,
      value: null,
      options: this.getSearchTermsAsObservable([
        {
          display: 'Either',
          value: null
        },
        {
          display: 'Yes',
          value: 'yes'
        },
        {
          display: 'No',
          value: 'no'
        },
      ])
    },
    {
      id: 'level',
      title: 'Level',
      enabled: true,
      value: null,
      options: this.getSearchTermsAsObservable([
        {
          display: 'All',
          value: null
        },
        {
          display: '1',
          value: '1'
        },
        {
          display: '2',
          value: '2'
        },
        {
          display: '3',
          value: '3'
        },
        {
          display: '4',
          value: '4'
        },
        {
          display: '6',
          value: '6'
        },
        {
          display: '7',
          value: '7'
        },
        {
          display: '20',
          value: '20'
        },
        {
          display: '21',
          value: '21'
        },
      ])
    },
    {
      id: 'quality',
      title: 'Quality',
      enabled: true,
      value: null,
      options: this.getSearchTermsAsObservable([
        {
          display: 'All',
          value: null
        },
        {
          display: '0',
          value: '0'
        },
        {
          display: '20',
          value: '20'
        },
        {
          display: '23',
          value: '23'
        }
      ])
    },
    {
      id: 'tier',
      title: 'Tier',
      enabled: true,
      value: null,
      options: this.getSearchTermsAsObservable([
        {
          display: 'All',
          value: null
        },
        {
          display: 'None',
          value: 'none'
        },
        {
          display: 'White',
          value: 'white'
        },
        {
          display: 'Yellow',
          value: 'yellow'
        },
        {
          display: 'Red',
          value: 'red'
        },
        {
          display: '1',
          value: '1'
        },
        {
          display: '2',
          value: '2'
        },
        {
          display: '3',
          value: '3'
        },
        {
          display: '4',
          value: '4'
        },
        {
          display: '5',
          value: '5'
        },
        {
          display: '6',
          value: '6'
        },
        {
          display: '7',
          value: '7'
        },
        {
          display: '8',
          value: '8'
        },
        {
          display: '9',
          value: '9'
        },
        {
          display: '10',
          value: '10'
        },
        {
          display: '11',
          value: '11'
        },
        {
          display: '12',
          value: '12'
        },
        {
          display: '13',
          value: '13'
        },
        {
          display: '14',
          value: '14'
        },
        {
          display: '15',
          value: '15'
        },
        {
          display: '16',
          value: '16'
        }
      ])
    },
  ];

  constructor(private leagueService: LeagueService,
              private categoryService: CategoryService,
              private router: Router,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {

  }

  getCriteria(id: string): SearchCriteria {
    return this.searchCriteria.find(c => c.id === id);
  }

  getSearchTermsAsObservable(terms: SearchTerm[]): Observable<SearchTerm[]> {
    return new Observable(t => {
      t.next(terms);
      t.complete();
    });
  }

  getGroupsAsObservableSearchTerms(): Observable<SearchTerm[]> {
    const category = this.activatedRoute.snapshot.queryParamMap.get('category');

    return new Observable(t => {
      this.categoryService.entries$.subscribe(n => {
        if (!category) {
          return;
        }

        const groups = n.find((m) => m.name.toLowerCase() === category).groups;
        const searchTerms = groups.map(g => new SearchTerm(g.display, g.name));
        t.next(searchTerms);
        t.complete();
      });
    });
  }

  getLeaguesAsObservableSearchTerms(): Observable<SearchTerm[]> {
    return new Observable(t => {
      this.leagueService.entries$.subscribe(n => {
        const searchTerms = n.map(g => new SearchTerm(g.display, g.name));
        t.next(searchTerms);
        t.complete();
      });
    });
  }
}
