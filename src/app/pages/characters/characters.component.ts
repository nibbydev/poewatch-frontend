import { Component, OnInit } from '@angular/core';
import { SiteDataService } from '../../services/api/site-data.service';
import { SiteData } from '../../modules/api/site-data';
import { first } from 'rxjs/operators';
import { Criteria } from '../../modules/criteria';
import { CharacterService } from '../../services/api/character.service';
import { AccountService } from '../../services/api/account.service';
import { CriteriaUtil } from '../../utility/criteria-util';

@Component({
  selector: 'pw-characters',
  templateUrl: './characters.component.html',
  styleUrls: ['./characters.component.css']
})
export class CharactersComponent implements OnInit {
  public siteData: SiteData;

  public characterCriteria: Criteria = {
    id: 'account',
    title: 'Account Name',
    showTitle: false,
    inputType: 'input',
    visible: false,
    disabled: false,
    value: null,
    defaultOptionIndex: null,
    setInitialQueryParam: false,
    unsetDefaultQueryParam: true,
    showSpinner: false,
    options: null,
    onChange: () => {
      CriteriaUtil.resetOne(this.accountCriteria);
      this.onChange();
    }
  };
  public accountCriteria: Criteria = {
    id: 'character',
    title: 'Character Name',
    showTitle: false,
    inputType: 'input',
    visible: false,
    disabled: false,
    value: null,
    defaultOptionIndex: null,
    setInitialQueryParam: false,
    unsetDefaultQueryParam: true,
    showSpinner: false,
    options: null,
    onChange: () => {
      CriteriaUtil.resetOne(this.characterCriteria);
      this.onChange();
    }
  };

  constructor(private siteDataService: SiteDataService,
              private characterService: CharacterService,
              private accountService: AccountService) {
  }

  ngOnInit() {
    this.siteDataService.data$.pipe(first()).subscribe(d => this.siteData = d);
  }

  private onChange(): void {

  }

}
