import { TestBed } from '@angular/core/testing';

import { ContratoFiniquitoAnexoService } from './contrato-finiquito-anexo.service';

describe('ContratoFiniquitoAnexoService', () => {
  let service: ContratoFiniquitoAnexoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContratoFiniquitoAnexoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
