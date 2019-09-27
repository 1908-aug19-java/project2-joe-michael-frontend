import { Component, OnInit, AfterViewInit } from '@angular/core';

import { UserService } from '../../services/user.service';
import { ApiService } from '../../services/api.service';

import { User } from '../../interfaces/user';
import { Team, Teams } from '../../interfaces/team';
import { League, Leagues } from '../../interfaces/leagues';

@Component({
    selector: 'app-team',
    templateUrl: './team.component.html',
    styleUrls: ['./team.component.css']
})

export class TeamComponent implements OnInit, AfterViewInit {

    constructor(private userService: UserService, private api: ApiService) { }

    teamId: number = +window.sessionStorage.getItem('currentTeam');
    leagueId: number = +window.sessionStorage.getItem('currentLeague');

    loginSub;
    userSub;
    loginStatus: boolean = this.userService.loggedIn;
    user: User = this.userService.user;

    validationEmitter;

    teamsSub;
    teamsEmitter;
    team: Team = this.api.teams.api.teams[0];

    leaguesSub;
    leaguesEmitter;
    leagues: League[] = this.api.leagues.api.leagues;

    activeId: number;

    ngOnInit() {

        this.validationEmitter = this.api.getValidationEmitter();

        this.loginSub = this.userService.getLoginStatus().subscribe((item: boolean) => this.loginStatus = item);
        this.userSub = this.userService.getUser().subscribe((item: User) => this.user = item);

        this.teamsEmitter = this.api.getTeamsEmitter();
        this.leaguesEmitter = this.api.getLeaguesEmitter();

        this.teamsSub = this.teamsEmitter.subscribe((teams: Teams) => this.team = teams.api.teams[0]);
        this.leaguesSub = this.leaguesEmitter.subscribe((leagues: Leagues) => this.initLeagues(leagues));
    }

    ngAfterViewInit() {

        if (this.team.team_id === this.teamId) {

            this.api.resendTeams();
        }

        for (const league of this.leagues) {

            if (league.league_id === this.leagueId) {

                this.api.resendLeagues();
            }
        }
    }

    initLeagues(leagues: Leagues) {

        this.leagues = leagues.api.leagues;

        this.activeId = this.leagues[this.leagues.length - 1].league_id;
    }

    onTabClick(id: number) {

        this.activeId = id;
    }
}
