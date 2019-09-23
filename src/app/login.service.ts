import { Injectable, Input, Output, EventEmitter } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class LoginService {

    @Output() loginEmitter: EventEmitter<boolean> = new EventEmitter();

    constructor() { }

    usernameFilter: RegExp = /^[a-zA-Z0-9@.-]{1,}$/g;
    emailFilter:RegExp = /(\b[a-zA-Z0-9.-]{3,}\b)\@(\b[a-zA-Z]{1,}\b)\.(\b[a-zA-Z]{2,}\b)/g;

    logIn(username:string, password:string): number{

        if(username.match(this.usernameFilter) || username.match(this.emailFilter)){

            return 1;
        }


        //TODO: Add HTTP functionality after database is integrated
        return 2;
    }

    change(value:boolean){

        this.loginEmitter.emit(value);
    }

    getLoginStatus(){

        return this.loginEmitter;
    }
}
