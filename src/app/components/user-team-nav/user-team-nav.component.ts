import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User, UserTeam, NewTeam } from '../../interfaces/user';

@Component({
    selector: 'app-user-team-nav',
    templateUrl: './user-team-nav.component.html',
    styleUrls: ['./user-team-nav.component.css']
})
export class UserTeamNavComponent implements OnInit {

    constructor(public userService: UserService) { }

    expandedState = +window.sessionStorage.getItem('expandedState');

    ngOnInit() {

    }

    createNewFantasyTeam() {

        const placeholderName = `Fantasy Team #${this.userService.fantasyTeams.length + 1}`;
        const newTeam: NewTeam = {

            api_team_id: 0,
            api_league_id: 0,
            name: placeholderName,
            type: 'FANTASY',
            players: []
        };

        this.userService.addFantasyTeam(newTeam);
    }

    setExpand(state: number) {

        this.expandedState === state ? this.expandedState = 0 : this.expandedState = state;
        window.sessionStorage.setItem('expandedState', this.expandedState.toString());
    }
}
