import {Injectable} from '@angular/core';
import {GetEntry} from '../shared/data/get-entry';

@Injectable({
  providedIn: 'root'
})
export class PricePaginationService {
  // default nr of entries per page
  public readonly pageSize = 50;
  // nr of currently visible pages
  public visiblePages = 1;
  // nr of currently visible entries
  public visibleEntries = 0;
  // nr of currently total entries
  public totalEntries = 0;
  // nr of items that match the search
  public matchingEntries = 0;

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

  public page(allEntries: GetEntry[], matchingEntries: GetEntry[]): GetEntry[] {
    this.matchingEntries = matchingEntries.length;
    this.totalEntries = allEntries.length;

    const pagedEntries = this.isPaged(matchingEntries.length)
      ? matchingEntries.slice(0, this.pageSize * this.visiblePages)
      : matchingEntries;

    // save nr of visible entries
    this.visibleEntries = pagedEntries.length;
    return pagedEntries;
  }

  public showButton(): boolean {
    return this.visibleEntries < this.totalEntries;
  }
}
