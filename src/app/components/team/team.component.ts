import { Component, OnInit, AfterViewInit, EventEmitter, Output } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd, NavigationStart } from '@angular/router';

import { UserService } from '../../services/user.service';
import { ApiService } from '../../services/api.service';

import { User, NewPlayer } from '../../interfaces/user';
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

export class TeamComponent implements OnInit {

    @Output() rosterEmitter: EventEmitter<Players> = new EventEmitter();
    @Output() sortedFixturesEmitter: EventEmitter<Fixture[]> = new EventEmitter();
    @Output() sortedLeaguesEmitter: EventEmitter<League[][]> = new EventEmitter();

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

    activeLeague;
    activeSeason;

    test;

    leagueMap = {};
    sortedLeagues: League[][];

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
        this.userSub = this.userService.userEmitter.subscribe((item: User) => this.user = item);

        this.leaguesSub = this.api.leaguesEmitter.subscribe((leagues: Leagues) => this.initLeagues(leagues));
        this.playersSub = this.api.playersEmitter.subscribe((players: Players) => this.sortPlayers(players.api.players));
        this.teamsSub = this.api.teamsEmitter.subscribe((teams: Teams) => this.initTeams(teams));

        this.fixturesSub = this.api.teamFixturesEmitter.subscribe(
            (fixtures: Fixtures) => this.sortedFixturesEmitter.emit(fixtures.api.fixtures)
        );

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

            this.sortLeagues(leagues.api.leagues);

            for (let i = 0 ; i < leagues.api.leagues.length ; i++) {

                this.seasonMap[leagues.api.leagues[i].league_id] = i;
            }

            this.activeLeague = {
                name: this.sortedLeagues[0][0].name,
                idx: 0
            };

            this.activeSeason = {

                name: this.sortedLeagues[0][0].season,
                id: this.sortedLeagues[0][0].league_id,
                idx: 0
            };

            const y = this.activeSeason.name;

            this.api.getSeasonStatistics(this.activeSeason.id, this.api.teams.api.teams[0].team_id);
            this.api.getPlayersByTeamSeason(`${y}-${y + 1}`, this.api.teams.api.teams[0].team_id);
            this.api.getTeamFixturesBySeason(this.activeSeason.id, this.api.teams.api.teams[0].team_id);

            this.loaded = true;
        }
    }

    switchLeague(league: League, idx: number) {

        this.activeLeague = {
            name: league.name,
            idx
        };

        this.activeSeason = {

            name: league.season,
            id: league.league_id,
            idx: -1
        };

        this.switchSeason(league, 0);
    }

    switchSeason(league: League, idx: number) {

        if (idx !== this.activeSeason.idx) {

            this.activeSeason = {

                name: league.season,
                id: league.league_id,
                idx
            };

            this.sorted = false;
            this.matchsFilterOption = 0;
            this.rosterSortOption = 0;

            const y = this.sortedLeagues[this.activeLeague.idx][this.activeSeason.idx].season;
            this.api.getSeasonStatistics(this.activeSeason.id, this.api.teams.api.teams[0].team_id);
            this.api.getPlayersByTeamSeason(`${y}-${y + 1}`, this.api.teams.api.teams[0].team_id);
            this.api.getTeamFixturesBySeason(this.activeSeason.id, this.api.teams.api.teams[0].team_id);

        }
    }

    sortPlayers(players: Player[]) {

        if (!this.sorted && players.length === 0) {

            this.api.getPlayersByTeamSeason(

                this.activeSeason.name, this.api.teams.api.teams[0].team_id
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

    sortLeagues(leagues: League[]) {

        this.sortedLeagues = [];
        this.leagueMap = {};

        let idx = 0;

        for (const league of leagues) {

            if (this.leagueMap[league.name] !== undefined) {

                this.sortedLeagues[this.leagueMap[league.name]].push(league);

            } else {

                this.leagueMap[league.name] = idx;
                this.sortedLeagues[idx] = [];
                this.sortedLeagues[idx].push(league);
                idx++;
            }
        }

        for (const league of this.sortedLeagues) {

            league.sort(
                (l1: League, l2: League) => {
                    if (l1.season > l2.season) {

                        return -1;
                    }

                    if (l1.season < l2.season) {

                        return 1;
                    }

                    return 0;
                });
        }

        this.sortedLeaguesEmitter.emit(this.sortedLeagues);
    }

    addFantasyPlayer(teamIdx: number, player: Player) {

        const newPlayer: NewPlayer = {

            api_player_id: player.player_id,
            name: player.player_name,
            type: 'FANTASY'
        };

        this.userService.addFantasyPlayer(this.userService.fantasyTeams[teamIdx], newPlayer);
    }
}
