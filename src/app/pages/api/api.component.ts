import {Component, OnInit} from '@angular/core';
import {ApiDocService} from '../../services/api-doc.service';

@Component({
  selector: 'app-api',
  templateUrl: './api.component.html',
  styleUrls: ['./api.component.css']
})
export class ApiComponent implements OnInit {

  constructor(private apiDocService: ApiDocService) {
  }

  ngOnInit() {
  }

}
