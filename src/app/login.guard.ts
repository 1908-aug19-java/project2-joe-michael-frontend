import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CanActivate } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {

    constructor(private router: Router) {}

    canActivate() {

        if (sessionStorage.getItem('loggedIn') === 'true') {

            return true;

        } else {

            this.router.navigate(['/login']);
            return false;
        }
    }

}
