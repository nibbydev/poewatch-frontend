import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PricePaginationService {
  private readonly pagination: { pageSize: number, visiblePageCount: number, visible: number, total: number } = {
    pageSize: 5,
    visiblePageCount: 1,
    visible: 0,
    total: 0
  };

  constructor() {
  }

  public resetPagination(): void {
    this.pagination.visiblePageCount = 1;
    this.pagination.visible = 0;
    this.pagination.total = 0;
  }

  public getPagination(): { pageSize: number, visiblePageCount: number, visible: number, total: number } {
    return this.pagination;
  }

  public incPage(): void {
    this.pagination.visiblePageCount++;
  }

  public isPaged(itemCount: number): boolean {
    return this.pagination.visiblePageCount && itemCount > this.pagination.pageSize * this.pagination.visiblePageCount
  }

  public page<T>(allEntries: T[], entries: T[]): T[] {
    this.pagination.total = allEntries.length;

    entries = this.isPaged(entries.length)
      ? entries.slice(0, this.pagination.pageSize * this.pagination.visiblePageCount)
      : entries;

    // save nr of visible entries
    this.pagination.visible = entries.length;
    return entries;
  }
}
