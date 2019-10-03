import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

import { FixtureService } from '../../services/fixture.service';
import { ApiService } from '../../services/api.service';

import { Fixture, Fixtures } from '../../interfaces/fixtures';
import { Leagues, League, LeagueRef } from '../../interfaces/leagues';

@Component({
    selector: 'app-user-matches',
    templateUrl: './user-matchs.component.html',
    styleUrls: ['./user-matchs.component.css']
})
export class UserMatchsComponent implements OnInit {

    constructor(private fixtureService: FixtureService, private api: ApiService) { }

    fixtureSub;

    leagues: League[] = LeagueRef.api.leagues;

    leagueMap = {};

    filterOption = 0;
    activeFixture = 0;

    mappedFixtures: Fixture[];

    @Output() mappedFixtureEmitter: EventEmitter<Fixtures> = new EventEmitter();
    @Output() mappedDropdownEmitter: EventEmitter<Fixture[]> = new EventEmitter();

    ngOnInit() {

        this.fixtureSub = this.api.fixturesEmitter.subscribe(
            (fixtures: Fixtures) => this.mapFixtures(fixtures)
        );
    }

    onFixtureExpand(id: number) {

        this.activeFixture = this.activeFixture === id ? 0 : id;

        if (this.activeFixture) {

            this.api.getFixturePredictionById(id);
        }
    }

    mapFixtures(fixtures: Fixtures) {

        this.filterOption = 0;
        this.mappedFixtures = [];

        let idx = 0;

        for (const fixture of fixtures.api.fixtures) {

            const league: League = this.findLeague(fixture.league_id, 0);

            if (league === null) {

                continue;
            }

            if (this.leagueMap[league.name] === undefined) {

                this.leagueMap[league.name] = idx;
                this.leagueMap[idx] = league.name;
                this.mappedFixtures.push(fixture);
                idx++;
            }
        }

        this.mappedFixtureEmitter.emit(fixtures);
        this.mappedDropdownEmitter.emit(this.mappedFixtures);

    }

    findLeague(guess: number, last: number): League {

        const init: League = this.leagues[guess - 1 + last];

        if (init === undefined) {

            return null;
        }

        if (init.league_id > guess) {

            if (last >= 1) {

                return null;
            }

            return this.findLeague(guess, last - 1);
        }

        if (init.league_id < guess) {

            if (last <= -1) {

                return null;
            }

            return this.findLeague(guess, last + 1);
        }

        return init;
    }
}
