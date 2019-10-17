import {Component, OnInit} from '@angular/core';
import {FaqService} from '../../services/faq.service';

@Component({
  selector: 'app-front',
  templateUrl: './front.component.html',
  styleUrls: ['./front.component.css']
})
export class FrontComponent implements OnInit {

  constructor(private faqService: FaqService) {
  }

  ngOnInit() {
  }

}
