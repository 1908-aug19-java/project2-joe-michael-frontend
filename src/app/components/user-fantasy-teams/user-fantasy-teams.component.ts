import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { UserService } from '../../services/user.service';

import { UserTeam } from '../../interfaces/user';

@Component({
    selector: 'app-user-fantasy-teams',
    templateUrl: './user-fantasy-teams.component.html',
    styleUrls: ['./user-fantasy-teams.component.css']
})

export class UserFantasyTeamsComponent implements OnInit {

    constructor(public userService: UserService, public route: ActivatedRoute) { }

    teamIdx: number;
    inputDisabled = true;
    teamName: string;

    ngOnInit() {

        this.route.paramMap.subscribe(params => {

                this.teamIdx = this.userService.findFantasyTeamById(parseInt(params.get('id'), 10));
                this.teamName = this.userService.fantasyTeams[this.teamIdx].name;
                this.inputDisabled = true;
            }
        )
    }

    saveName() {

        this.inputDisabled = true;
        const team: UserTeam = this.userService.fantasyTeams[this.teamIdx];
        team.name = this.teamName;
    }

}
