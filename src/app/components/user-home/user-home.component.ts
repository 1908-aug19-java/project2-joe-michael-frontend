import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../interfaces/user';

@Component({
    selector: 'app-user-home',
    templateUrl: './user-home.component.html',
    styleUrls: ['./user-home.component.css']
})
export class UserHomeComponent implements OnInit {

    constructor(public userService: UserService) { }

    user: User = this.userService.user;

    hasName: boolean;
    showForm = false;
    numFollowedTeams;
    numFollowedPlayers;
    favoriteTeam;
    favoritePlayer;
    players;
    teams;

    ngOnInit() {

        this.checkName();
        this.setInfo();
    }

    setInfo() {

        this.players = JSON.parse(sessionStorage.getItem('followedPlayers'));
        this.teams = JSON.parse(sessionStorage.getItem('followedTeams'));
        this.numFollowedPlayers = this.players.length;
        this.numFollowedTeams = this.teams.length;
    }

    checkName() {

        if (this.user.name === null || this.user.name === '') {

            this.hasName = false;

        } else {

            this.hasName = true;
        }
    }

    showNameForm() {

        this.showForm = true;
    }

    setName() {

        this.showForm = false;
        this.checkName();
        this.userService.updateUser();
    }

}
