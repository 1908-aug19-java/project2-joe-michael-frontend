import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { ApiService } from '../../services/api.service';
import { UserService } from '../../services/user.service';

import { Fixture, Fixtures } from '../../interfaces/fixtures';
import { NewWager } from '../../interfaces/user';

@Component({
    selector: 'app-user-match',
    templateUrl: './user-match.component.html',
    styleUrls: ['./user-match.component.css']
})

export class UserMatchComponent implements OnInit {

    constructor(public api: ApiService,
                public userService: UserService,
                private route: ActivatedRoute,
                private location: Location) { }

    matchFixtures;
    matchFixtureSub;

    wagerAmount;
    wagerVictor;
    wagerRecipient;

    wagerValid: boolean[] = [true, true, true];
    wagerAvailable = true;

    finished = false;

    fixture: Fixture;

    guessStringEnum: string[] = ['HOME', 'AWAY', 'TIE'];

    ngOnInit() {

        this.matchFixtureSub = this.api.matchFixtureEmitter.subscribe((fixtures: Fixtures) => this.parseFixture(fixtures.api.fixtures[0]));
    }

    parseFixture(fixture: Fixture) {

        this.finished = fixture.statusShort === 'FT';
        this.fixture = fixture;
    }

    validateForm() {

        if (!this.wagerAvailable) {

            return;
        }

        this.wagerValid[0] = this.wagerRecipient != null;
        this.wagerValid[1] = this.wagerVictor != null;
        this.wagerValid[2] = (this.wagerAmount >= 0 && parseInt((this.wagerAmount * 1000).toString(), 10) % 10 === 0);

        for (const bool of this.wagerValid) {

            if (!bool) {

                return;
            }
        }

        this.makeWager();
    }

    makeWager() {

        const receivingUser = this.userService.findUser(parseInt(this.wagerRecipient.toString(), 10));
        const wager: NewWager = {

            amt: this.wagerAmount,
            initiating: this.userService.user,
            recieving: receivingUser,
            api_game_id: this.fixture.fixture_id,
            guess: this.wagerVictor,
            accepted: false
        };

        this.wagerAvailable = false;
        this.userService.addNewWager(wager);
    }
}
