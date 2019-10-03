import { TestBed, async, inject } from '@angular/core/testing';

import { TeamLoadGuard } from './team-load.guard';

describe('TeamLoadGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TeamLoadGuard]
    });
  });

  it('should ...', inject([TeamLoadGuard], (guard: TeamLoadGuard) => {
    expect(guard).toBeTruthy();
  }));
});
