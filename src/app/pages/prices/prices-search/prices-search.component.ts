import { Component, OnInit } from '@angular/core';
import { LeagueService } from '../../../services/league.service';
import { CategoryService } from '../../../services/category.service';
import { Observable } from 'rxjs';
import { GroupEntry } from '../../../services/data/group-entry';

@Component({
  selector: 'app-prices-search',
  templateUrl: './prices-search.component.html',
  styleUrls: ['./prices-search.component.css']
})
export class PricesSearchComponent implements OnInit {
  private settings = {
    league: true,
    lowDaily: true,
    group: true,
    search: true
  };

  private groups$ = this.categoryService.getGroups('map');

  constructor(private leagueService: LeagueService, private categoryService: CategoryService) {
  }

  ngOnInit() {
  }

}
