import {Component, OnInit} from '@angular/core';
import {FaqService} from '../../services/faq.service';

@Component({
  selector: 'pw-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  constructor(private faqService: FaqService) {
  }

  ngOnInit() {
  }
}
