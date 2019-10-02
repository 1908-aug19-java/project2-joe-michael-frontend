import { Component, OnInit } from '@angular/core';

import { UserService } from '../../services/user.service';
import { ApiService } from '../../services/api.service';

import { UserWager } from '../../interfaces/user';
import { Fixture, Fixtures } from '../../interfaces/fixtures';

@Component({
    selector: 'app-user-wager',
    templateUrl: './user-wager.component.html',
    styleUrls: ['./user-wager.component.css']
})

export class UserWagerComponent implements OnInit {

    constructor(public userService: UserService, public api: ApiService) { }

    filterOption = 0;
    activeWagerIdx: number;

    mfeSub;

    guessStringEnum: string[] = ['HOME', 'AWAY', 'TIE'];
    resolutionStrings: string[] = ['ACCEPTED', 'INITIATOR WON', 'RECEIVER WON', 'DECLINED', 'EXPIRED'];

    ngOnInit() {

        this.activeWagerIdx = 0;
        this.api.getFixtureById(this.userService.wagers[this.activeWagerIdx].api_game_id);

        this.mfeSub = this.api.matchFixtureEmitter.subscribe(
            (fixtures: Fixtures) => this.parseMatchFixture(fixtures.api.fixtures[0], this.activeWagerIdx)
        );
    }

    switchActiveWager(wager: UserWager) {

        this.activeWagerIdx = this.userService.findWagerById(wager.id);
        this.api.getFixtureById(this.userService.wagers[this.activeWagerIdx].api_game_id);
    }

    parseMatchFixture(fixture: Fixture, idx: number) {

        if (fixture.statusShort === 'FT') {

            const divIdx = fixture.score.fulltime.indexOf('-');
            const homeScore = parseInt(fixture.score.fulltime.substring(0, divIdx), 10);
            const awayScore = parseInt(fixture.score.fulltime.substring(divIdx + 1), 10);
            const outcome = (homeScore > awayScore) ? 0 : (homeScore === awayScore) ? 2 : 1;

            const wager: UserWager = this.userService.wagers[idx];

            if (wager.resolution === 0 && wager.accepted === true) {

                wager.resolution = outcome === wager.guess ? 1 : 2;

                this.userService.updateWager(wager);

            } else if (wager.resolution === 0 && wager.accepted === false) {

                wager.resolution = 4;

                this.userService.updateWager(wager);
            }
        }
    }

}
