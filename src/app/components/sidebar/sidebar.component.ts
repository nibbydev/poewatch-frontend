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

  constructor(public sidebarService: SidebarService,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params => {
      this.category = params.category;
    });
  }

  public isVertical(): boolean {
    return this.direction === 'vertical';
  }

  public isHorizontal(): boolean {
    return this.direction === 'horizontal';
  }
}
