import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

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

    errorMessages = {

        2: 'Invalid email format',
        3: 'Invalid password format',
        4: 'Passwords do not match',
        5: 'Email is already taken',
        6: 'Please fill all form fields'
    };


    ngOnInit() {
    }

    onSignUpClick() {

        this.signUpStatus = this.userService.signUp(this.email, this.password, this.confirmationPassword);
        console.log(this.signUpStatus);

        if (this.signUpStatus === 1) {

            this.router.navigate(['/user']);
        }
    }
}
