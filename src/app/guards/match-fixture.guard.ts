import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

import { ApiService } from '../services/api.service';

@Injectable({
  providedIn: 'root'
})
export class MatchFixtureGuard implements CanActivate {

    constructor(private api: ApiService) { }

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

        this.api.getFixtureById(+next.paramMap.get('id'));

        return true;
    }

}
