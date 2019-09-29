import { Component, OnInit, AfterViewInit } from '@angular/core';

import { FixtureService } from '../../services/fixture.service';
import { ApiService } from '../../services/api.service';

import { Fixture, Fixtures } from '../../interfaces/fixtures';

@Component({
  selector: 'app-user-matches',
  templateUrl: './user-matchs.component.html',
  styleUrls: ['./user-matchs.component.css']
})
export class UserMatchsComponent implements OnInit, AfterViewInit {

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
