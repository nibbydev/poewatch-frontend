import { Component, OnInit } from '@angular/core';
import { FaqService } from '../../services/api/faq.service';

@Component({
  selector: 'pw-front',
  templateUrl: './front.component.html',
  styleUrls: ['./front.component.css']
})
export class FrontComponent implements OnInit {

  constructor(private faqService: FaqService) {
  }

  ngOnInit() {
  }

}
