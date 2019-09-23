import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    username = '';
    password = '';

    loginStatus = 0;

    constructor(private loginService: LoginService, private router: Router) { }

    ngOnInit() {
    }

    onSignInClick() {

        this.loginStatus = this.loginService.logIn(this.username.trim(), this.password.trim());

        if (this.loginStatus === 1) {

            this.loginService.change(true);
            this.router.navigate(['/user']);
        }
    }

}
