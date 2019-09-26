import { Component, OnInit } from '@angular/core';
import { Fixture, Fixtures } from '../fixtures';
import { FixtureService } from '../fixture.service';

@Component({
  selector: 'app-user-matches',
  templateUrl: './user-matches.component.html',
  styleUrls: ['./user-matches.component.css']
})
export class UserMatchesComponent implements OnInit {

  constructor(private fixtureService: FixtureService) { }

  fixtures: Fixtures = this.fixtureService.fixtures;
  
  ngOnInit() {
  }

}
