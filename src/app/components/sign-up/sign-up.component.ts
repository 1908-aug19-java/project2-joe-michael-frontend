import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UserService } from '../../services/user.service';

@Component({
    selector: 'app-sign-up',
    templateUrl: './sign-up.component.html',
    styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

    constructor(private userService: UserService, private router: Router) { }

    email = '';
    password = '';
    confirmationPassword = '';

    signUpStatus = 0;

    statusSub;

    errorMessages = {

        2: 'Invalid email format',
        3: 'Invalid password format',
        4: 'Passwords do not match',
        5: 'Email is already taken',
        6: 'Please fill all form fields'
    };


    ngOnInit() {

        this.statusSub = this.userService.signupStatusEmitter.subscribe((status: number) => this.parseStatus(status));
    }

    onSignUpClick() {

        this.userService.signUp(this.email, this.password, this.confirmationPassword);

    }

    parseStatus(status: number) {

        this.signUpStatus = status;

        if (this.signUpStatus === 1) {

            this.router.navigate(['/user']);
        }

    }
}
