import { TestBed } from '@angular/core/testing';

import { SearchCriteriaService } from './search-criteria.service';

describe('SearchCriteriaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SearchCriteriaService = TestBed.get(SearchCriteriaService);
    expect(service).toBeTruthy();
  });
});
