import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';

import { Observable } from 'rxjs';

import { ApiService } from '../services/api.service';

@Injectable({
    providedIn: 'root'
})
export class ApiGuard implements CanActivate {

    constructor(private api: ApiService) {}

    canActivate() {

        if (window.sessionStorage.getItem('seasons') === null) {

            this.api.getSeasons();
        }

        if (window.sessionStorage.getItem('fixtures') === null) {

            this.api.getFixturesByDate(1);
        }

        return true;
    }

}
