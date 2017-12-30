import { TestBed, inject } from '@angular/core/testing';

import { MyfilesService } from './myfiles.service';

describe('MyfilesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MyfilesService]
    });
  });

  it('should be created', inject([MyfilesService], (service: MyfilesService) => {
    expect(service).toBeTruthy();
  }));
});
