import { TestBed, async, inject } from '@angular/core/testing';

import { PlayerLoadGuard } from './player-load.guard';

describe('PlayerLoadGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PlayerLoadGuard]
    });
  });

  it('should ...', inject([PlayerLoadGuard], (guard: PlayerLoadGuard) => {
    expect(guard).toBeTruthy();
  }));
});
