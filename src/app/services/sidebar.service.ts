import {Injectable} from '@angular/core';
import {SidebarItem} from './data/sidebar-item';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {shareReplay} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  public sidebarItems$: Observable<SidebarItem[]>;

  constructor(private http: HttpClient) {
    this.sidebarItems$ = this.getSidebarItems()
      .pipe(shareReplay());
  }

  private getSidebarItems(): Observable<SidebarItem[]> {
    return this.http.get<SidebarItem[]>('/assets/sidebar.json');
  }
}
