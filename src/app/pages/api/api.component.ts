import { Component, OnInit } from '@angular/core';
import { ApiDocService } from '../../services/api/api-doc.service';
import { AppConstants } from '../../app-constants';

@Component({
  selector: 'pw-api',
  templateUrl: './api.component.html',
  styleUrls: ['./api.component.css']
})
export class ApiComponent implements OnInit {
  public appConstants = AppConstants;

  constructor(public apiDocService: ApiDocService) {
  }

  ngOnInit() {
  }

}
