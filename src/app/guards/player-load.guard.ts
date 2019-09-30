import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

import { ApiService } from '../services/api.service';

@Injectable({
    providedIn: 'root'
})

export class PlayerLoadGuard implements CanActivate {

    constructor(public api: ApiService) { }

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

        this.api.getPlayerById(+next.paramMap.get('id'));
        return true;
    }
}
