import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../interfaces/user';

@Component({
    selector: 'app-user-team-nav',
    templateUrl: './user-team-nav.component.html',
    styleUrls: ['./user-team-nav.component.css']
})
export class UserTeamNavComponent implements OnInit {

    constructor(private userService: UserService) { }

    user: User = this.userService.user;

    userEmitter;

    expandedState = 0;
    userFantasyTeams: string[] = ['Team 1', 'Team 2', 'Team 3'];

    ngOnInit() {

        this.userEmitter = this.userService.getUser().subscribe(item => this.user = item);
    }
}
