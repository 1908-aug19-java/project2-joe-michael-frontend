import { Injectable, Input, Output, EventEmitter } from '@angular/core';
import { User } from './user';

@Injectable({
    providedIn: 'root'
})
export class UserService {

    @Output() loginEmitter: EventEmitter<boolean> = new EventEmitter();
    @Output() userEmitter: EventEmitter<User> = new EventEmitter();

    constructor() { }

    usernameFilter: RegExp = /^[a-zA-Z0-9@.-]{1,}$/g;
    emailFilter: RegExp = /(\b[a-zA-Z0-9.-]{3,}\b)\@(\b[a-zA-Z]{1,}\b)\.(\b[a-zA-Z]{2,}\b)/g;
    passwordFilter: RegExp = /^[^ ]{1,}$/g;


    temp1: User = {
        id: 1,
        username: 'mjzhang2',
        password: 'password123',
        email: 'mjzhang2@test.com',
        firstname: 'Michael',
        lastname: 'Zhang',
        level: 1
    };

    temp2: User = {
        id: 2,
        username: 'kechen6',
        password: 'password123',
        email: 'kechen6@test.com',
        firstname: 'Kevin',
        lastname: 'Chen',
        level: 1
    };



    // Status Codes
    // 0 - Null
    // 1 - Login Success
    // 2 - Invalid Username Format
    // 3 - Invalid Username Password Combination

    logIn(username: string, password: string): number {

        if (username.match(this.usernameFilter) || username.match(this.emailFilter)) {

            if (username === this.temp1.username && password === this.temp1.password) {

                this.sendUser(this.temp1);
                return 1;

            } else if (username === this.temp2.username && password === this.temp2.password) {

                this.sendUser(this.temp2);
                return 1;

            } else {

                return 3;
            }
        }

        return 2;
    }

    // Status Codes
    // 0 - Null
    // 1 - Signup success
    // 2 - Invalid Username / Email Format
    // 3 - Invalid Password format
    // 4 - Invalid Passwords - Don't match
    // 5 - Username Already Taken
    // 6 - Fields not all filled

    signUp(username: string, password: string, confirmationPassword: string): number {

        if (username === '' || password === '' || confirmationPassword === '') {

            return 6;

        } else if (password !== confirmationPassword) {

            return 4;

        } else if (password.match(this.passwordFilter) === null) {

            return 3;

        } else if (username.match(this.emailFilter) === null) {

            return 2;
        }


        const newUser: User = {

            id: 3,
            username: username.toLowerCase(),
            password: '{password}',
            email: username.toLowerCase(),
            firstname: '',
            lastname: '',
            level: 1
        };

        this.change(true);
        this.sendUser(newUser);

        return 1;

    }

    change(value) {

        window.sessionStorage.setItem('loggedIn', value);
        this.loginEmitter.emit(value);
    }

    getLoginStatus() {

        return this.loginEmitter;
    }

    sendUser(user) {

        window.sessionStorage.setItem('user', JSON.stringify(user));
        this.userEmitter.emit(user);
    }

    getUser() {

        return this.userEmitter;
    }
}
