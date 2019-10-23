/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { EnterpriseService } from './enterprise.service';

describe('Service: Enterprise', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EnterpriseService]
    });
  });

  it('should ...', inject([EnterpriseService], (service: EnterpriseService) => {
    expect(service).toBeTruthy();
  }));
});
