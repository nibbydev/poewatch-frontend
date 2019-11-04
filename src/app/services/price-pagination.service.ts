import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PricePaginationService {
  // default nr of entries per page
  public readonly pageSize = 10;
  // nr of currently visible pages
  public visiblePages = 1;
  // nr of currently visible entries
  public visibleEntries = 0;
  // nr of currently total entries
  public totalEntries = 0;

  constructor() {
  }

  public resetPagination(): void {
    this.visiblePages = 1;
    this.visibleEntries = 0;
    this.totalEntries = 0;
  }

  public incPage(): void {
    this.visiblePages++;
  }

  public isPaged(itemCount: number): boolean {
    return itemCount > this.pageSize * this.visiblePages;
  }

  public page<T>(allEntries: T[], entries: T[]): T[] {
    this.totalEntries = allEntries.length;

    entries = this.isPaged(entries.length)
      ? entries.slice(0, this.pageSize * this.visiblePages)
      : entries;

    // save nr of visible entries
    this.visibleEntries = entries.length;
    return entries;
  }

  public showButton(): boolean {
    return this.visibleEntries < this.totalEntries;
  }
}
