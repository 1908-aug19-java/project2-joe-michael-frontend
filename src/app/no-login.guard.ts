import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NoLoginGuard implements CanActivate {

    constructor(private router: Router) {}

    canActivate() {

      if (window.sessionStorage.getItem('loggedIn') === 'true') {

          this.router.navigate(['/user']);
          return false;

      } else {

          return true;
      }
  }

}
