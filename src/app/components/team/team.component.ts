import { Component, OnInit, AfterViewInit, EventEmitter, Output } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd, NavigationStart } from '@angular/router';

import { UserService } from '../../services/user.service';
import { ApiService } from '../../services/api.service';

import { User } from '../../interfaces/user';
import { Team, Teams } from '../../interfaces/team';
import { League, Leagues } from '../../interfaces/leagues';
import { SeasonStatistics, Statistics } from '../../interfaces/season-statistics';
import { Players, Player } from '../../interfaces/players';
import { Fixtures, Fixture, StatusShort } from '../../interfaces/fixtures';

@Component({
    selector: 'app-team',
    templateUrl: './team.component.html',
    styleUrls: ['./team.component.css']
})

export class TeamComponent implements OnInit, AfterViewInit {

    @Output() rosterEmitter: EventEmitter<Players> = new EventEmitter();
    @Output() sortedFixturesEmitter: EventEmitter<Fixture[]> = new EventEmitter();

    constructor(public userService: UserService, public api: ApiService, public router: Router) {

        router.events.subscribe((e) => this.onRouteEvent(e));
    }

    loaded = false;
    seasonCheck = false;
    sorted = false;

    teamId: number = +window.sessionStorage.getItem('currentTeam');
    leagueId: number = +window.sessionStorage.getItem('currentLeague');
    currentSeason = JSON.parse(window.sessionStorage.getItem('currentSeason'));

    loginSub;
    userSub;
    loginStatus: boolean = this.userService.loggedIn;
    user: User = this.userService.user;

    validationEmitter;

    teamsSub;
    leaguesSub;
    seasonStatisticsSub;
    playersSub;
    fixturesSub;

    activeId: number;

    test;

    playerMap = {};
    sortedPlayers: Player[] = [];

    futureFixtures: Fixture[] = [];

    matchsFilterOption = 0;
    rosterSortOption = 0;

    seasonMap = {};

    teamsInit = false;
    leaguesInit = false;

    ngOnInit() {

        this.loaded = false;

        this.loginSub = this.userService.getLoginStatus().subscribe((item: boolean) => this.loginStatus = item);
        this.userSub = this.userService.getUser().subscribe((item: User) => this.user = item);

        this.leaguesSub = this.api.leaguesEmitter.subscribe((leagues: Leagues) => this.initLeagues(leagues));
        this.playersSub = this.api.playersEmitter.subscribe((players: Players) => this.sortPlayers(players.api.players));
        this.teamsSub = this.api.teamsEmitter.subscribe((teams: Teams) => this.initTeams(teams));

        this.fixturesSub = this.api.teamFixturesEmitter.subscribe(
            (fixtures: Fixtures) => this.sortedFixturesEmitter.emit(fixtures.api.fixtures)
        );

    }

    ngAfterViewInit() {

        if (this.api.teams !== null && this.api.teams.api.teams[0].team_id === this.teamId) {

            this.api.resendTeams();
        }

        if (this.api.leagues !== null) {

            for (const league of this.api.leagues.api.leagues) {

                if (league.league_id === this.leagueId) {

                    this.api.resendLeagues();
                }
            }
        }
    }

    onRouteEvent(event) {

        if (event instanceof NavigationStart) {

            this.loaded = false;
            this.seasonCheck = false;
            this.sorted = false;
            this.teamsInit = false;
            this.leaguesInit = false;
            this.matchsFilterOption = 0;
            this.rosterSortOption = 0;
        }
    }

    initLeagues(leagues: Leagues) {

        this.leaguesInit = true;
        this.attemptInit(leagues);
    }

    initTeams(teams: Teams) {

        this.teamsInit = true;
        this.attemptInit(this.api.leagues);
    }

    attemptInit(leagues: Leagues) {

        if (!this.loaded && this.teamsInit && this.leaguesInit) {

            for (let i = 0 ; i < leagues.api.leagues.length ; i++) {

                this.seasonMap[leagues.api.leagues[i].league_id] = i;
            }

            const y = leagues.api.leagues[leagues.api.leagues.length - 1].season;

            this.activeId = leagues.api.leagues[leagues.api.leagues.length - 1].league_id;
            this.api.getSeasonStatistics(this.activeId, this.api.teams.api.teams[0].team_id);
            this.api.getPlayersByTeamSeason(`${y}-${y + 1}`, this.api.teams.api.teams[0].team_id);
            this.api.getTeamFixturesBySeason(this.activeId, this.api.teams.api.teams[0].team_id);

            this.loaded = true;
        }
    }

    onTabClick(id: number) {

        if (id !== this.activeId) {

            this.activeId = id;
            this.sorted = false;
            this.matchsFilterOption = 0;
            this.rosterSortOption = 0;

            const y = this.api.leagues.api.leagues[this.seasonMap[this.activeId]].season;
            this.api.getSeasonStatistics(this.activeId, this.api.teams.api.teams[0].team_id);
            this.api.getPlayersByTeamSeason(`${y}-${y + 1}`, this.api.teams.api.teams[0].team_id);
            this.api.getTeamFixturesBySeason(this.activeId, this.api.teams.api.teams[0].team_id);
        }
    }

    sortPlayers(players: Player[]) {

        if (!this.sorted && players.length === 0) {

            this.api.getPlayersByTeamSeason(

                this.api.leagues.api.leagues[this.seasonMap[this.activeId]].season.toString(), this.api.teams.api.teams[0].team_id
            );

            this.sorted = true;
            return;
        }

        this.sortedPlayers = [];
        this.playerMap = {};

        let idx = 0;

        for (const player of players) {

            if (player.firstname == null) {

                continue;
            }

            if (this.playerMap[player.player_id] == null) {

                this.playerMap[player.player_id] = idx;
                this.sortedPlayers.push(player);
                idx++;
            }

        }

        this.rosterEmitter.emit({api: {results: this.sortedPlayers.length, players: this.sortedPlayers}});
        this.sorted = true;
    }

    sortFixtures(fixtures: Fixture[]) {

        let idx = 0;

        this.futureFixtures = [];

        for (const fixture of fixtures) {

            if (fixture.statusShort === StatusShort.NS && idx < 3) {

                this.futureFixtures.push(fixture);
                idx++;
            }
        }

        this.sortedFixturesEmitter.emit(this.futureFixtures);

    }
}
