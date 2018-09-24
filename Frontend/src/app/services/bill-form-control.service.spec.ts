import { TestBed, inject } from '@angular/core/testing';

import { BillFormControlService } from './bill-form-control.service';

describe('BillFormControlService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BillFormControlService]
    });
  });

  it('should be created', inject([BillFormControlService], (service: BillFormControlService) => {
    expect(service).toBeTruthy();
  }));
});
