import { Injectable } from '@angular/core';

import { Fixture, Fixtures } from '../interfaces/fixtures';

@Injectable({
  providedIn: 'root'
})
export class FixtureService {

  constructor() { }

  fixtures: Fixtures = JSON.parse(window.sessionStorage.getItem('fixtures'));
  getFixtureById(id: number): null | Fixture {

      for (const fixture of this.fixtures.api.fixtures) {

          if (fixture.fixture_id === id) {

              return fixture;
          }
      }

      return null;
  }
}
