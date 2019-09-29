import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, pipe } from 'rxjs';
import { map } from 'rxjs/operators';

import { ApiService } from '../services/api.service';

@Injectable({
    providedIn: 'root'
})

export class TeamLoadGuard implements CanActivate {

    currentLeague: number = +window.sessionStorage.getItem('currentLeague');
    currentTeam: number = +window.sessionStorage.getItem('currentTeam');

    constructor(private api: ApiService) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

        const league: number = +route.paramMap.get('league');
        const team: number = +route.paramMap.get('team');

        if (league !== this.currentLeague || this.api.leagues == null) {

            this.api.getLeaguesById(league);
            this.currentLeague = league;
            window.sessionStorage.setItem('currentLeague', league.toString());

        } else {

            this.api.setLeagues(JSON.parse(window.sessionStorage.getItem('leagues')));
        }

        if (team !== this.currentTeam || this.api.teams == null) {

            this.api.validateTeamLeague(team, league);
            this.currentTeam = team;
            window.sessionStorage.setItem('currentTeam', team.toString());

        } else {

            this.api.setTeams(JSON.parse(window.sessionStorage.getItem('teams')));
        }

        return true;
    }
}
