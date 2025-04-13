import { TestBed } from '@angular/core/testing';

import { RegistroEstudianteService } from './registro-estudiante.service';

describe('RegistroEstudianteService', () => {
  let service: RegistroEstudianteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RegistroEstudianteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
