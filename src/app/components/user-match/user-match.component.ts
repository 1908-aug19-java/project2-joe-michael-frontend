import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { ApiService } from '../../services/api.service';

import { Fixture, Fixtures } from '../../interfaces/fixtures';

@Component({
    selector: 'app-user-match',
    templateUrl: './user-match.component.html',
    styleUrls: ['./user-match.component.css']
})

export class UserMatchComponent implements OnInit, AfterViewInit {

    constructor(private api: ApiService,
                private route: ActivatedRoute,
                private location: Location) { }

    matchFixtures;
    matchFixtureSub;

    ngOnInit() {

        this.matchFixtureSub = this.api.matchFixtureEmitter.subscribe((fixtures: Fixtures) => this.matchFixtures = fixtures);
    }

    ngAfterViewInit() {

        this.api.resendMatchFixture();
    }
}
