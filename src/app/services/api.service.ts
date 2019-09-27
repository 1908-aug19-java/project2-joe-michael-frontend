import { Injectable, Input, Output, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Seasons } from '../interfaces/seasons';
import { Fixtures, Fixture } from '../interfaces/fixtures';

// @ts-ignore
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

    @Output() seasonsEmitter: EventEmitter<Seasons> = new EventEmitter();
    @Output() fixturesEmitter: EventEmitter<Fixtures> = new EventEmitter();

    httpOptions = {

        headers: new HttpHeaders({

            'X-RapidAPI-Host': this.host,
            'X-RapidAPI-Key': this.key
        })
    };

    constructor(private http: HttpClient) { }

    getSeasons() {

        const requestUrl = `${this.url}seasons`;

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

    getFixturesByDate(n) {

        const nextDay = new Date(new Date().getTime() + n * 24 * 60 * 60 * 1000);

        const day = nextDay.getDate();
        const month = nextDay.getMonth();
        const year = nextDay.getFullYear();

        const requestUrl = `${this.url}fixtures/date/${year}-${month + 1}-${day}`;

        this.http.get<Fixtures>(requestUrl, this.httpOptions).subscribe(fixtures => this.setFixtures(fixtures));
    }

    setFixtures(fixtures) {

        window.sessionStorage.setItem('fixtures', JSON.stringify(fixtures));
        this.fixtures = fixtures;
        this.fixturesEmitter.emit(fixtures);
    }

    getFixtureEmitter() {

        return this.fixturesEmitter;
    }
}
