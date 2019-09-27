import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UserService } from '../../services/user.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    username = '';
    password = '';

    loginStatus = 0;

    constructor(private userService: UserService, private router: Router) { }

    ngOnInit() {
    }

    onSignInClick() {

        this.loginStatus = this.userService.logIn(this.username.trim(), this.password.trim());

        if (this.loginStatus === 1) {

            this.userService.change(true);
            this.router.navigate(['/user']);
        }
    }

}
