import { TestBed } from '@angular/core/testing';

import { InternalizationService } from './internalization.service';

describe('InternalizationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: InternalizationService = TestBed.get(InternalizationService);
    expect(service).toBeTruthy();
  });
});
