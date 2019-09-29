import { Component, OnInit, AfterViewInit } from '@angular/core';

import { FixtureService } from '../../services/fixture.service';
import { ApiService } from '../../services/api.service';

import { Fixture, Fixtures } from '../../interfaces/fixtures';

@Component({
  selector: 'app-user-matches',
  templateUrl: './user-matches.component.html',
  styleUrls: ['./user-matches.component.css']
})
export class UserMatchesComponent implements OnInit, AfterViewInit {

  constructor(private fixtureService: FixtureService, private api: ApiService) { }

  fixtureSub;
  fixtures: Fixtures = this.api.fixtures;

  ngOnInit() {

      this.fixtureSub = this.api.fixturesEmitter.subscribe(item => this.fixtures = item);
  }

  ngAfterViewInit() {

      this.api.resendFixtures();
  }

}
