import { TestBed } from '@angular/core/testing';

import { GamePointsService } from './game-points.service';

describe('GamePointsService', () => {
  let service: GamePointsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GamePointsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
