import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

import { UserService } from '../../services/user.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    @Output() loginStatusEmitter: EventEmitter<number> = new EventEmitter();

    username = '';
    password = '';

    loginStatus = 0;
    loginBegin = false;
    loginSub;

    constructor(private userService: UserService, private router: Router) { }

    ngOnInit() {

        this.loginSub = this.userService.loginStatusEmitter.subscribe((status: number) => this.parseStatus(status));
    }

    onSignInClick() {

        if (!this.loginBegin) {

            this.loginBegin = true;

            this.userService.logIn(this.username.trim(), this.password.trim());
        }
    }

    parseStatus(status: number) {

        this.loginBegin = false;
        this.loginStatus = status;
    }

}
