import { TestBed } from '@angular/core/testing';

import { TurnoservService } from './turnoserv.service';

describe('TurnoservService', () => {
  let service: TurnoservService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TurnoservService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
