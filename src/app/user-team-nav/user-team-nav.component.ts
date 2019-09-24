import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { User } from '../user';

@Component({
    selector: 'app-user-team-nav',
    templateUrl: './user-team-nav.component.html',
    styleUrls: ['./user-team-nav.component.css']
})
export class UserTeamNavComponent implements OnInit {

    constructor(private userService: UserService) { }

    user: User = this.userService.user;

    userEmitter;

    ngOnInit() {

        this.userEmitter = this.userService.getUser().subscribe(item => this.user = item);
    }



}
