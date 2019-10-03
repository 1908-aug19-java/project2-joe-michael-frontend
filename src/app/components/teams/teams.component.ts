import { Component, OnInit } from '@angular/core';

import { UserService } from '../../services/user.service';
import { ApiService } from '../../services/api.service';

import { Seasons, SeasonsList } from '../../interfaces/seasons';
import { Countries, Country, CountryList } from '../../interfaces/countries';
import { User } from '../../interfaces/user';
import { Leagues, League } from '../../interfaces/leagues';

@Component({
    selector: 'app-teams',
    templateUrl: './teams.component.html',
    styleUrls: ['./teams.component.css']
})
export class TeamsComponent implements OnInit {

    constructor(private userService: UserService, public api: ApiService) { }

    loginSub;
    loginStatus: boolean = this.userService.loggedIn;

    seasons = SeasonsList.api.seasons;
    countries = CountryList.api.countries;

    activeSeasonIdx = +JSON.parse(window.sessionStorage.getItem('activeSearchSeason')) || 10;
    activeCountryIdx = +JSON.parse(window.sessionStorage.getItem('activeSearchCountry')) || 36;
    activeLeagueIdx = 0;

    leaguesSub;

    ngOnInit() {

        this.loginSub = this.userService.getLoginStatus().subscribe(item => this.loginStatus = item);
        this.api.getSearchLeagues(this.countries[this.activeCountryIdx].code, this.seasons[this.activeSeasonIdx]);

        this.api.searchLeaguesEmitter.subscribe((leagues: Leagues) => {

                this.getLeagueTeams(leagues.api.leagues[0]);
            }
        );
    }

    switchActiveSeason(idx: number) {

        this.activeSeasonIdx = idx;
        this.activeLeagueIdx = 0;
        this.api.getSearchLeagues(this.countries[this.activeCountryIdx].code, this.seasons[this.activeSeasonIdx]);
        window.sessionStorage.setItem('activeSearchSeason', idx.toString());
    }

    switchActiveCountry(idx: number) {

        this.activeCountryIdx = idx;
        this.activeLeagueIdx = 0;
        this.api.getSearchLeagues(this.countries[this.activeCountryIdx].code, this.seasons[this.activeSeasonIdx]);
        window.sessionStorage.setItem('activeSearchCountry', idx.toString());
    }

    switchActiveLeague(idx: number) {

        this.activeLeagueIdx = idx;
        this.getLeagueTeams(this.api.searchLeagues[idx]);
    }

    getLeagueTeams(league: League) {

        if (this.api.searchLeagues.api.results) {
            this.api.getSearchTeams(this.api.searchLeagues.api.leagues[this.activeLeagueIdx].league_id);
        }
    }

}
