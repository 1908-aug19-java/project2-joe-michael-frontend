import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, pipe } from 'rxjs';
import { map } from 'rxjs/operators';

import { ApiService } from '../services/api.service';

@Injectable({
    providedIn: 'root'
})

export class TeamLoadGuard implements CanActivate {

    constructor(private api: ApiService) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

        const team: number = +route.paramMap.get('team');

        this.api.getTeamById(team);
        this.api.getLeaguesByTeamId(team);

        return true;
    }
}
