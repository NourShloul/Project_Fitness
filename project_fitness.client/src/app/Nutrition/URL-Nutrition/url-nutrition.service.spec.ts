import { TestBed } from '@angular/core/testing';

import { UrlNutritionService } from './url-nutrition.service';

describe('UrlNutritionService', () => {
  let service: UrlNutritionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UrlNutritionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
