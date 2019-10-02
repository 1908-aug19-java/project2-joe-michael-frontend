import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UserService } from '../../services/user.service';

import { User } from '../../interfaces/user';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private userService: UserService, private router: Router) { }

  loginSub;
  userSub;
  loginStatus: boolean = this.userService.loggedIn;
  user: User = this.userService.user;

  ngOnInit() {

      this.loginSub = this.userService.getLoginStatus().subscribe(item => this.loginStatus = item);
      this.userSub = this.userService.userEmitter.subscribe(item => this.user = item);
  }

  logout() {

      window.sessionStorage.clear();
      this.router.navigate(['/']);
      this.userService.clean();
  }

}
