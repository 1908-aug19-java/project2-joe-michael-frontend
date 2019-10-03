import { Injectable, Input, Output, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

import { Seasons } from '../interfaces/seasons';
import { Fixtures, Fixture } from '../interfaces/fixtures';
import { Teams, Team } from '../interfaces/team';
import { League, Leagues } from '../interfaces/leagues';
import { SeasonStatistics } from '../interfaces/season-statistics';
import { Players, Player } from '../interfaces/players';
import { Predictions, Prediction } from '../interfaces/prediction';

import * as apiVar from './key';

@Injectable({
    providedIn: 'root'
})

export class ApiService {

    key = apiVar.apiKey || '';
    host = apiVar.apiHost || '';
    url = apiVar.apiUrl || '';

    seasons: Seasons = JSON.parse(window.sessionStorage.getItem('seasons'));
    fixtures: Fixtures = JSON.parse(window.sessionStorage.getItem('fixtures'));
    teams: Teams = JSON.parse(window.sessionStorage.getItem('teams'));
    leagues: Leagues = JSON.parse(window.sessionStorage.getItem('leagues'));
    seasonStatistics: SeasonStatistics = JSON.parse(window.sessionStorage.getItem('seasonStatistics'));
    players: Players = JSON.parse(window.sessionStorage.getItem('players'));
    teamFixtures: Fixtures = JSON.parse(window.sessionStorage.getItem('teamFixtures'));
    matchFixture: Fixtures = JSON.parse(window.sessionStorage.getItem('matchFixture'));
    player: Players = JSON.parse(window.sessionStorage.getItem('player'));
    prediction: Prediction = JSON.parse(window.sessionStorage.getItem('prediction'));

    validationTeam: Teams;
    validationLeague: League;

    @Output() validationEmitter: EventEmitter<boolean> = new EventEmitter();

    @Output() seasonsEmitter: EventEmitter<Seasons> = new EventEmitter();
    @Output() fixturesEmitter: EventEmitter<Fixtures> = new EventEmitter();
    @Output() teamsEmitter: EventEmitter<Teams> = new EventEmitter();
    @Output() leaguesEmitter: EventEmitter<Leagues> = new EventEmitter();
    @Output() seasonStatisticsEmitter: EventEmitter<SeasonStatistics> = new EventEmitter();
    @Output() playersEmitter: EventEmitter<Players> = new EventEmitter();
    @Output() teamFixturesEmitter: EventEmitter<Fixtures> = new EventEmitter();
    @Output() matchFixtureEmitter: EventEmitter<Fixtures> = new EventEmitter();
    @Output() playerEmitter: EventEmitter<Players> = new EventEmitter();
    @Output() predictionEmitter: EventEmitter<Prediction> = new EventEmitter();

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

    getFixturesByDate() {

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

    getTeamById(id: number) {

        const requestUrl = `${this.url}/teams/team/${id}`;

        this.http.get<Teams>(requestUrl, this.httpOptions).subscribe(teams => this.setTeams(teams));
    }

    setTeams(teams: Teams) {

        window.sessionStorage.setItem('teams', JSON.stringify(teams));
        this.teams = teams;
        this.teamsEmitter.emit(teams);
    }

    resendTeams() {

        this.setTeams(this.teams);
    }

    getLeaguesById(id: number) {

        const requestUrl = `${this.url}/leagues/seasonsAvailable/${id}`;

        this.http.get<Leagues>(requestUrl, this.httpOptions).subscribe(leagues => this.setLeagues(leagues));
    }

    getLeaguesByTeamId(id: number) {

        const requestUrl = `${this.url}/leagues/team/${id}`;

        this.http.get<Leagues>(requestUrl, this.httpOptions).subscribe(
            (leagues: Leagues) => this.setLeagues(leagues)
        );
    }

    setLeagues(leagues: Leagues) {
        window.sessionStorage.setItem('leagues', JSON.stringify(leagues));
        this.leagues = leagues;
        this.leaguesEmitter.emit(leagues);
    }

    resendLeagues() {

        this.setLeagues(this.leagues);
    }

    getSeasonStatistics(league: number, team: number) {

        const requestUrl = `${this.url}/statistics/${league}/${team}`;

        this.http.get<SeasonStatistics>(requestUrl, this.httpOptions).subscribe(

            (stats: SeasonStatistics) => this.setSeasonStatistics(stats)
        );

        window.sessionStorage.setItem('currentSeason', JSON.stringify({league_id: league, team_id: team}));
    }

    setSeasonStatistics(stats: SeasonStatistics) {

        window.sessionStorage.setItem('seasonStatistics', JSON.stringify(stats));
        this.seasonStatistics = stats;
        this.seasonStatisticsEmitter.emit(stats);
    }

    resendSeasonStatistics() {

        this.setSeasonStatistics(this.seasonStatistics);
    }

    getPlayersByTeamSeason(league: string, team: number) {

        const requestUrl = `${this.url}/players/team/${team}/${league}`;

        this.http.get<Players>(requestUrl, this.httpOptions).subscribe((players: Players) => this.setPlayers(players));
    }

    setPlayers(players: Players) {

        window.sessionStorage.setItem('players', JSON.stringify(players));
        this.players = players;
        this.playersEmitter.emit(players);
    }

    resendPlayers() {

        this.setPlayers(this.players);
    }

    getTeamFixturesBySeason(season: number, team: number) {

        const requestUrl = `${this.url}/fixtures/team/${team}/${season}`;

        this.http.get<Fixtures>(requestUrl, this.httpOptions).subscribe((fixtures: Fixtures) => this.setTeamFixtures(fixtures));
    }

    setTeamFixtures(fixtures: Fixtures) {

        window.sessionStorage.setItem('teamFixtures', JSON.stringify(fixtures));
        this.teamFixtures = fixtures;
        this.teamFixturesEmitter.emit(fixtures);
    }

    resendTeamFixtures() {

        this.setTeamFixtures(this.teamFixtures);
    }

    getFixtureById(id: number) {

        const requestUrl = `${this.url}/fixtures/id/${id}`;

        this.http.get<Fixtures>(requestUrl, this.httpOptions).subscribe((fixtures: Fixtures) => this.setMatchFixture(fixtures));
    }

    setMatchFixture(fixtures: Fixtures) {

        window.sessionStorage.setItem('matchFixture', JSON.stringify(fixtures));
        this.matchFixture = fixtures;
        this.matchFixtureEmitter.emit(fixtures);
    }

    resendMatchFixture() {

        this.setMatchFixture(this.matchFixture);
    }

    getPlayerById(id: number) {

        const requestUrl = `${this.url}/players/player/${id}`;

        this.http.get<Players>(requestUrl, this.httpOptions).subscribe((players: Players) => this.setPlayer(players));
    }

    setPlayer(players: Players) {

        window.sessionStorage.setItem('player', JSON.stringify(players));
        this.player = players;
        this.playerEmitter.emit(players);
    }

    resendPlayer() {

        this.setPlayer(this.player);
    }

    getFixturePredictionById(id: number) {

        const requestUrl = `${this.url}/predictions/${id}`;

        this.http.get<Predictions>(requestUrl, this.httpOptions).subscribe(
            (predictions: Predictions) => this.setPrediction(predictions.api.predictions[0])
        );
    }

    setPrediction(prediction: Prediction) {

        window.sessionStorage.setItem('prediction', JSON.stringify(prediction));
        this.prediction = prediction;
        this.predictionEmitter.emit(prediction);
    }

    resendPrediction() {

        this.setPrediction(this.prediction);
    }
}
