import { TestBed } from '@angular/core/testing';

import { CookieAuthService } from './cookie-auth-service';

describe('CookieAuthService', () => {
  let service: CookieAuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CookieAuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
