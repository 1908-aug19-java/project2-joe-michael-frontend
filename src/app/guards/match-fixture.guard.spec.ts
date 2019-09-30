import { TestBed, async, inject } from '@angular/core/testing';

import { MatchFixtureGuard } from './match-fixture.guard';

describe('MatchFixtureGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MatchFixtureGuard]
    });
  });

  it('should ...', inject([MatchFixtureGuard], (guard: MatchFixtureGuard) => {
    expect(guard).toBeTruthy();
  }));
});
