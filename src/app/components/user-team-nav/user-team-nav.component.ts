import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../interfaces/user';

@Component({
    selector: 'app-user-team-nav',
    templateUrl: './user-team-nav.component.html',
    styleUrls: ['./user-team-nav.component.css']
})
export class UserTeamNavComponent implements OnInit, OnDestroy {

    constructor(private userService: UserService) { }

    expandedState = +window.sessionStorage.getItem('expandedState');

    ngOnInit() {
    }

    ngOnDestroy() {

        window.sessionStorage.setItem('expandedState', this.expandedState.toString());
    }
}
