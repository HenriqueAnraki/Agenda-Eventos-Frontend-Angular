import { TestBed } from '@angular/core/testing';

import { ResponseErrorInterceptor } from './response-error.interceptor';

describe('ResponseErrorInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      ResponseErrorInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: ResponseErrorInterceptor = TestBed.inject(ResponseErrorInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
