import { TestBed } from '@angular/core/testing';

import { GuardaJuegosService } from './guarda-juegos.service';

describe('GuardaJuegosService', () => {
  let service: GuardaJuegosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GuardaJuegosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
