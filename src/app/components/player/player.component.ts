import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router, NavigationStart, NavigationEnd } from '@angular/router';

import { ApiService } from '../../services/api.service';
import { UserService } from '../../services/user.service';

import { User } from '../../interfaces/user';
import { Players, Player } from '../../interfaces/players';

@Component({
    selector: 'app-player',
    templateUrl: './player.component.html',
    styleUrls: ['./player.component.css']
})

export class PlayerComponent implements OnInit {

    constructor(public api: ApiService, public userService: UserService, public router: Router) {

        router.events.subscribe((e) => this.onRouteEvent(e));
    }

    @Output() sortedPlayerEmitter: EventEmitter<Player[][]> = new EventEmitter();

    loginSub;
    userSub;
    loginStatus: boolean = this.userService.loggedIn;
    user: User = this.userService.user;

    sortedPlayers: Player[][] = [];
    playerMap = {};

    playerSub;

    activeLeague: { name: string, idx: number };
    activeSeason: { name: string, idx: number };

    ngOnInit() {

        this.loginSub = this.userService.getLoginStatus().subscribe((item: boolean) => this.loginStatus = item);
        this.userSub = this.userService.getUser().subscribe((item: User) => this.user = item);
        this.playerSub = this.api.playerEmitter.subscribe((players: Players) => this.sortPlayers(players.api.players));
    }

    onRouteEvent(event) {

        if (event instanceof NavigationStart) {

            this.playerMap = {};
            this.sortedPlayers = [];
        }
    }

    switchLeague(player: Player, idx) {

        this.activeLeague = { name: player.league, idx};
        this.activeSeason = { name: player.season, idx: 0};
    }

    sortPlayers(players: Player[]) {

        this.sortedPlayers[0] = [];
        this.activeLeague = {name: players[1].league, idx: 0};
        this.activeSeason = {name: players[1].season, idx: 0};

        this.playerMap = {};

        let idx = 1;

        for (let i = 1 ; i < players.length ; i++) {

            if (this.playerMap[players[i].league] !== undefined) {

                if (!this.playerMap[players[i].league][players[i].season]) {

                    this.playerMap[players[i].league].seasonIdx++;
                    this.playerMap[players[i].league][players[i].season] = this.playerMap[players[i].league].seasonIdx;
                }

                this.sortedPlayers[this.playerMap[players[i].league].idx].push(players[i]);

            } else {

                this.playerMap[players[i].league] = { idx, seasonIdx: 1 };
                this.playerMap[players[i].league][players[i].season] = 1;
                this.sortedPlayers[idx] = [];
                this.sortedPlayers[idx].push(players[i]);
                idx++;
            }
        }

        this.sortedPlayers.splice(0, 1);

        for (const player of this.sortedPlayers) {

            player.sort(this.seasonSort);
        }

        this.sortedPlayerEmitter.emit(this.sortedPlayers);
    }

    seasonSort(p1: Player, p2: Player) {

        if (p1.season > p2.season) {

            return -1;
        }

        if (p1.season < p2.season) {

            return 1;
        }
    }
}
