import { TestBed } from '@angular/core/testing';

import { GameInformationService } from './game-information.service';

describe('GameInformationService', () => {
  let service: GameInformationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GameInformationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
