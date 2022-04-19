import { TestBed } from '@angular/core/testing';

import { EmployeesFacadeService } from './employees-facade.service';

describe('EmployeesFacadeService', () => {
  let service: EmployeesFacadeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmployeesFacadeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
