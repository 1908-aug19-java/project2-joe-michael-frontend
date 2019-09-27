import { Component, OnInit } from '@angular/core';

import { UserService } from '../../services/user.service';
import { ApiService } from '../../services/api.service';

import { Seasons } from '../../interfaces/seasons';
import { User } from '../../interfaces/user';

@Component({
    selector: 'app-teams',
    templateUrl: './teams.component.html',
    styleUrls: ['./teams.component.css']
})
export class TeamsComponent implements OnInit {

    constructor(private userService: UserService, private api: ApiService) { }

    loginSub;
    userSub;
    loginStatus: boolean = this.userService.loggedIn;
    user: User = this.userService.user;

    seasonsSub;

    seasons: Seasons = this.api.seasons;

    ngOnInit() {

        this.loginSub = this.userService.getLoginStatus().subscribe(item => this.loginStatus = item);
        this.userSub = this.userService.getUser().subscribe(item => this.user = item);
        this.seasonsSub = this.api.getSeasonsEmitter().subscribe(item => this.seasons);
    }

}
