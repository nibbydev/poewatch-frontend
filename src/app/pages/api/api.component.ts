import {Component, OnInit} from '@angular/core';
import {ApiDocService} from '../../services/api-doc.service';
import {AppSettings} from '../../app-settings';

@Component({
  selector: 'app-api',
  templateUrl: './api.component.html',
  styleUrls: ['./api.component.css']
})
export class ApiComponent implements OnInit {
  private appSettings = AppSettings;

  constructor(private apiDocService: ApiDocService) {
  }

  ngOnInit() {
  }

}
