import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login.service';
import { Router } from '@angular/router';
import { User } from '../user';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private loginService: LoginService, private router: Router) { }

  loginSub;
  userSub;
  loginStatus: boolean = window.sessionStorage.getItem('loggedIn') === 'true';
  user: User = JSON.parse(window.sessionStorage.getItem('user'));

  ngOnInit() {

      this.loginSub = this.loginService.getLoginStatus().subscribe(item => this.loginStatus = item);
      this.userSub = this.loginService.getUser().subscribe(item => this.user = item);
  }

  logout() {

      window.sessionStorage.clear();
      this.loginService.change(false);
      this.router.navigate(['/']);
  }

}
