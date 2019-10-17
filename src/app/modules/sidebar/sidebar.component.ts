import {Component, Input, OnInit} from '@angular/core';
import {SidebarService} from '../../services/sidebar.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  @Input() private direction: string;

  constructor(private sidebarService: SidebarService) {
  }

  ngOnInit() {
  }

  private isVertical(): boolean {
    return this.direction === 'vertical';
  }
  private isHorizontal(): boolean {
    return this.direction === 'horizontal';
  }
}
