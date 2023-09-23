import { TestBed } from '@angular/core/testing';

import { LoaderService } from './loader.service';

describe('LoaderService', () => {
  let service: LoaderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoaderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('initial value to be false', () => {
    let loadStatus = false
    service.updateLoadingStatus(false)
    service.isLoading$.subscribe(value => {
      loadStatus = value
    })
    expect(loadStatus).toBe(false)
  })

  it('initial value to be true', () => {
    let loadStatus = false
    service.updateLoadingStatus(true)
    service.isLoading$.subscribe(value => {
      loadStatus = value
      console.log('value', value)
    })
    expect(loadStatus).toBe(true)
  })
});
