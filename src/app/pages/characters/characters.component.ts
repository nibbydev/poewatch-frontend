import { Component, OnInit } from '@angular/core';
import { SiteDataService } from '../../services/site-data.service';
import { SiteData } from '../../modules/api/site-data';
import { first } from 'rxjs/operators';
import { Criteria } from '../../modules/criteria';

@Component({
  selector: 'pw-characters',
  templateUrl: './characters.component.html',
  styleUrls: ['./characters.component.css']
})
export class CharactersComponent implements OnInit {
  public siteData: SiteData;

  public criteria = [
    {
      id: 'type',
      title: 'Type',
      showTitle: true,
      inputType: 'radio',
      visible: true,
      disabled: false,
      value: null,
      defaultOptionIndex: 0,
      setInitialQueryParam: true,
      unsetDefaultQueryParam: false,
      showSpinner: true,
      options: [
        {
          display: 'Account',
          value: 'account'
        },
        {
          display: 'Character',
          value: 'character'
        }
      ],
      onChange: () => this.onChange()
    },
    {
      id: 'name',
      title: 'Name',
      showTitle: true,
      inputType: 'input',
      visible: false,
      disabled: false,
      value: null,
      defaultOptionIndex: null,
      setInitialQueryParam: false,
      unsetDefaultQueryParam: true,
      showSpinner: false,
      options: null,
      onChange: () => this.onChange()
    }
  ] as Criteria[];

  constructor(private siteDataService: SiteDataService) {
  }

  ngOnInit() {
    this.siteDataService.data$.pipe(first()).subscribe(d => this.siteData = d);
  }

  private onChange(): void {

  }

}
