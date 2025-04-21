import { TestBed } from '@angular/core/testing';

import { DetallesOfertaService } from './detalles-oferta.service';

describe('DetallesOfertaService', () => {
  let service: DetallesOfertaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DetallesOfertaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
