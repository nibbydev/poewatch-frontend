import { Component, Input, OnInit } from '@angular/core';
import { SidebarService } from '../../services/api/sidebar.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'pw-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  @Input() private direction: string;
  private category: string;

  constructor(private sidebarService: SidebarService,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params => {
      this.category = params.category;
    });
  }

  private isVertical(): boolean {
    return this.direction === 'vertical';
  }
  private isHorizontal(): boolean {
    return this.direction === 'horizontal';
  }
}
