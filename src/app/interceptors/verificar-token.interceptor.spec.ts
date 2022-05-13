import { TestBed } from '@angular/core/testing';

import { VerificarTokenInterceptor } from './verificar-token.interceptor';

describe('VerificarTokenInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      VerificarTokenInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: VerificarTokenInterceptor = TestBed.inject(VerificarTokenInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
