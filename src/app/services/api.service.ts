import { Injectable, Input, Output, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

import { Seasons } from '../interfaces/seasons';
import { Fixtures, Fixture } from '../interfaces/fixtures';
import { Teams, Team } from '../interfaces/team';
import { League, Leagues } from '../interfaces/leagues';

import * as apiVar from './key';

@Injectable({
    providedIn: 'root'
})

export class ApiService {

    key = apiVar.key || '';
    host = apiVar.host || '';
    url = apiVar.url || '';

    seasons: Seasons = JSON.parse(window.sessionStorage.getItem('seasons'));
    fixtures: Fixtures = JSON.parse(window.sessionStorage.getItem('fixtures'));
    teams: Teams = JSON.parse(window.sessionStorage.getItem('teams'));
    leagues: Leagues = JSON.parse(window.sessionStorage.getItem('leagues'));

    validationTeam: Teams;
    validationLeague: League;

    @Output() validationEmitter: EventEmitter<boolean> = new EventEmitter();

    @Output() seasonsEmitter: EventEmitter<Seasons> = new EventEmitter();
    @Output() fixturesEmitter: EventEmitter<Fixtures> = new EventEmitter();
    @Output() teamEmitter: EventEmitter<Teams> = new EventEmitter();
    @Output() leaguesEmitter: EventEmitter<Leagues> = new EventEmitter();

    httpOptions = {

        headers: new HttpHeaders({

            'X-RapidAPI-Host': this.host,
            'X-RapidAPI-Key': this.key
        })
    };

    constructor(private http: HttpClient, private router: Router) { }

    validateTeamLeague(team: number, league: number) {

        this.validationEmitter.emit(false);

        const requestUrl = `${this.url}/teams/league/${league}`;

        this.http.get<Teams>(requestUrl, this.httpOptions).subscribe(teams => this.validate(teams, team));
    }

    validate(teams: Teams, team: number) {

        for (const t of teams.api.teams) {

            if (t.team_id === team) {

                this.validationEmitter.emit(true);
                this.setTeams({api: {results: 1, teams: [t]}});
                return;
            }
        }

        this.router.navigate(['/teams']);
    }

    getValidationEmitter() {

        return this.validationEmitter;
    }

    getNextDate() {

        const nextDay = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);

        const day = nextDay.getDate();
        const month = nextDay.getMonth();
        const year = nextDay.getFullYear();

        return `${year}-${month + 1}-${day}`;
    }

    getSeasons() {

        const requestUrl = `${this.url}/seasons`;

        this.http.get<Seasons>(requestUrl, this.httpOptions).subscribe(seasons => this.setSeasons(seasons));

    }

    setSeasons(seasons) {

        window.sessionStorage.setItem('seasons', JSON.stringify(seasons));
        this.seasons = seasons;
        this.seasonsEmitter.emit(seasons);
    }

    getSeasonsEmitter() {

        return this.seasonsEmitter;
    }

    getFixturesByDate() {

        console.log('getting fixtures');

        const requestUrl = `${this.url}/fixtures/date/${this.getNextDate()}`;

        this.http.get<Fixtures>(requestUrl, this.httpOptions).subscribe(fixtures => this.setFixtures(fixtures));
    }

    setFixtures(fixtures: Fixtures) {

        window.sessionStorage.setItem('fixtures', JSON.stringify(fixtures));
        this.fixtures = fixtures;
        this.fixturesEmitter.emit(fixtures);
    }

    resendFixtures() {

        this.setFixtures(this.fixtures);
    }

    getFixtureEmitter() {

        return this.fixturesEmitter;
    }

    getTeamById(id: number) {

        const requestUrl = `${this.url}/teams/team/${id}`;

        this.http.get<Teams>(requestUrl, this.httpOptions).subscribe(teams => this.setTeams(teams));
    }

    setTeams(teams: Teams) {

        window.sessionStorage.setItem('teams', JSON.stringify(teams));
        this.teams = teams;
        this.teamEmitter.emit(teams);
    }

    resendTeams() {

        this.setTeams(this.teams);
    }

    getTeamsEmitter() {

        return this.teamEmitter;
    }

    getLeaguesById(id: number) {

        const requestUrl = `${this.url}/leagues/seasonsAvailable/${id}`;

        this.http.get<Leagues>(requestUrl, this.httpOptions).subscribe(leagues => this.setLeagues(leagues));
    }

    setLeagues(leagues: Leagues) {

        window.sessionStorage.setItem('leagues', JSON.stringify(leagues));
        this.leagues = leagues;
        this.leaguesEmitter.emit(leagues);
    }

    resendLeagues() {

        this.setLeagues(this.leagues);
    }

    getLeaguesEmitter() {

        return this.leaguesEmitter;
    }
}
