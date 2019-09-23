import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private loginService: LoginService, private router: Router) { }

  loginSub;
  loginStatus = false;

  ngOnInit() {

      this.loginSub = this.loginService.getLoginStatus().subscribe(item => this.loginStatus = item);
  }

  logout() {

      this.loginService.change(false);
      this.router.navigate(['/']);
  }

}
