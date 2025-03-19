import { TestBed } from '@angular/core/testing';

import { FiniquitoService } from './finiquito.service';

describe('FiniquitoService', () => {
  let service: FiniquitoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FiniquitoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
