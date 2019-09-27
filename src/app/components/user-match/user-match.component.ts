import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { FixtureService } from '../../services/fixture.service';

import { Fixture, Fixtures } from '../../interfaces/fixtures';

@Component({
  selector: 'app-user-match',
  templateUrl: './user-match.component.html',
  styleUrls: ['./user-match.component.css']
})
export class UserMatchComponent implements OnInit {

  constructor(private fixtureService: FixtureService,
              private route: ActivatedRoute,
              private location: Location
              ) { }

  fixtures: Fixtures;
  fixture: Fixture;
  show: string;

  ngOnInit() {

      this.getFixtures();
  }


  getFixtures() {

      this.fixtures = this.fixtureService.fixtures;
      this.fixture = this.fixtureService.getFixtureById(+this.route.snapshot.paramMap.get('id'));
      this.show = JSON.stringify(this.fixture);
  }
}