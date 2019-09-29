import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';

import { Observable } from 'rxjs';

import { ApiService } from '../services/api.service';

@Injectable({
    providedIn: 'root'
})
export class ApiGuard implements CanActivate {

    currentNextDate: string = window.sessionStorage.getItem('nextDate');

    constructor(private api: ApiService) {}

    canActivate() {

        if (window.sessionStorage.getItem('seasons') === null) {

            this.api.getSeasons();
        }

        if (window.sessionStorage.getItem('fixtures') === null || this.currentNextDate !== this.api.getNextDate()) {

            this.api.getFixturesByDate();
            window.sessionStorage.setItem('nextDate', this.api.getNextDate());
        }

        return true;
    }

}
