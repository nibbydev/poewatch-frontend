import {Component, OnInit} from '@angular/core';
import {LeagueService} from '../../services/league.service';

@Component({
  selector: 'pw-leagues',
  templateUrl: './leagues.component.html',
  styleUrls: ['./leagues.component.css']
})
export class LeaguesComponent implements OnInit {

  constructor(private leagueService: LeagueService) {
  }

  ngOnInit() {
  }

}
