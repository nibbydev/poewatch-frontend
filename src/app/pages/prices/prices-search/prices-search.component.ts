import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { LeagueService } from '../../../services/league.service';
import { CategoryService } from '../../../services/category.service';
import { League } from '../../../services/data/league';

@Component({
  selector: 'app-prices-search',
  templateUrl: './prices-search.component.html',
  styleUrls: ['./prices-search.component.css']
})
export class PricesSearchComponent implements OnInit {
  @Output() private readonly searchEmitter: EventEmitter<string> = new EventEmitter<string>();
  @Output() private readonly leagueEmitter: EventEmitter<string> = new EventEmitter<string>();

  private settings = {
    visibility: {
      league: true,
      confidence: true,
      group: true,
      search: true,
      mapTier: false,
      gemQuality: false,
      gemLevel: false,
      baseInfluence: false,
      baseItemLevel: false,
      gemCorruption: false,
      links: false,
      rarity: false
    }
  };

  private groups$ = this.categoryService.getGroups('map');

  constructor(private leagueService: LeagueService,
              private categoryService: CategoryService) {
  }

  ngOnInit() {
  }

  private formatLeagueDisplay(league: League): string {
    return (league.active ? '' : '● ') + (league.display || league.name);
  }

}
