import { Injectable, Input, Output, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';

import { User, UserLogin, UserTeam, UserPlayer, UserWager, NewPlayer, NewTeam, NewWager } from '../interfaces/user';
import { Players, Player } from '../interfaces/players';
import { Teams, Team } from '../interfaces/team';
import { Leagues, League } from '../interfaces/leagues';

import * as dbVar from './key';

@Injectable({
    providedIn: 'root'
})

export class UserService {

    @Output() loginEmitter: EventEmitter<boolean> = new EventEmitter();
    @Output() userEmitter: EventEmitter<User> = new EventEmitter();

    @Output() loginStatusEmitter: EventEmitter<number> = new EventEmitter();
    @Output() usersEmitter: EventEmitter<User[]> = new EventEmitter();

    @Output() signupStatusEmitter: EventEmitter<number> = new EventEmitter();

    constructor(private http: HttpClient, private router: Router) { }
    dbUrl = dbVar.dbUrl;

    usernameFilter: RegExp = /^[a-zA-Z0-9@.-]{1,}$/g;
    emailFilter: RegExp = /(\b[a-zA-Z0-9.-]{3,}\b)\@(\b[a-zA-Z]{1,}\b)\.(\b[a-zA-Z]{2,}\b)/g;
    passwordFilter: RegExp = /^[^ ]{1,}$/g;

    user: User = JSON.parse(window.sessionStorage.getItem('user'));
    loggedIn: boolean = window.sessionStorage.getItem('loggedIn') === 'true';

    token = window.sessionStorage.getItem('token') !== null &&
        window.sessionStorage.getItem('token').substring(1, window.sessionStorage.getItem('token').length - 1);

    users: User[] = JSON.parse(window.sessionStorage.getItem('users')) || [];

    fantasyTeams: UserTeam[] = JSON.parse(window.sessionStorage.getItem('fantasyTeams')) || [];
    fantasyPlayers: UserPlayer[] = JSON.parse(window.sessionStorage.getItem('fantasyPlayers')) || [];

    followedTeams: UserTeam[] = JSON.parse(window.sessionStorage.getItem('followedTeams')) || [];
    followedPlayers: UserPlayer[] = JSON.parse(window.sessionStorage.getItem('followedPlayers')) || [];

    wagers: UserWager[] = JSON.parse(window.sessionStorage.getItem('wagers')) || [];

    httpRequestQueue = [];

    /*
        #################
        CLIENT-SIDE LOGIC
        #################
    */

    followPlayer(player: Player) {

        const obj: NewPlayer = {

            api_player_id: player.player_id,
            name: player.player_name,
            type: 'FOLLOWED'
        };

        const idx = this.isPlayerFollowed(player);

        if (idx !== -1) {

            this.deleteFollowedPlayer(this.followedPlayers[idx], idx);

        } else {

           this.addFollowedPlayer(obj);
        }
    }

    followTeam(team: Team, leagues: Leagues) {

        const obj: NewTeam = {

            api_team_id: team.team_id,
            api_league_id: 0,
            type: 'FOLLOWED',
            name: team.name,
            players: []

        };

        const idx = this.isTeamFollowed(team);

        if (idx !== -1) {

            this.deleteFollowedTeam(this.followedTeams[idx], idx);

        } else {

            this.addFollowedTeam(obj);
        }
    }

    isPlayerFollowed(player: Player): number {

        for (const obj of this.followedPlayers) {

            if (obj.api_player_id === player.player_id) {

                return this.followedPlayers.indexOf(obj);
            }
        }

        return -1;
    }

    isTeamFollowed(team: Team): number {

        for (const obj of this.followedTeams) {

            if (obj.api_team_id === team.team_id) {

                return this.followedTeams.indexOf(obj);
            }
        }

        return -1;
    }

    findWagerByFixture(id: number): number {

        for (const obj of this.wagers) {

            if (obj.api_game_id === id) {

                return this.wagers.indexOf(obj);
            }
        }

        return -1;
    }

    findWagerById(id: number): number {

        for (const obj of this.wagers) {

            if (obj.id === id) {

                return this.wagers.indexOf(obj);
            }
        }

        return -1;
    }

    findFantasyTeamById(id: number): number {

        for (const obj of this.fantasyTeams) {

            if (obj.id === id) {

                return this.fantasyTeams.indexOf(obj);
            }
        }

        return -1;
    }

    findFantasyPlayerById(id: number, teamIdx: number): number {

        for (const obj of this.fantasyTeams[teamIdx].players) {

            if (obj.id === id) {

                return this.fantasyTeams[teamIdx].players.indexOf(obj);
            }
        }

        return -1;
    }

    findFantasyPlayerByApiId(id: number, teamIdx: number): number {

        for (const obj of this.fantasyTeams[teamIdx].players) {

            if (obj.api_player_id === id) {

                return this.fantasyTeams[teamIdx].players.indexOf(obj);
            }
        }

        return -1;
    }

    acceptWager(id: number, res: boolean) {

        const updatedWager: UserWager = this.wagers[this.findWagerById(id)];

        updatedWager.accepted = true;

        if (!res) {

            updatedWager.resolution = 3;
        }

        this.updateWager(updatedWager);

    }

    makeHeaders(userId: number, token: string) {

        const httpOptions = {
            headers: new HttpHeaders({
                user_id: userId.toString(),
                token
            }),
        };

        return httpOptions;
    }

    logIn(username: string, password: string) {

        if (username === '' || password === '') {

            this.loginStatusEmitter.emit(4);
            return;

        }  else if (username.match(this.emailFilter)) {

            const loginUser: UserLogin = {

                email: username.toLowerCase(),
                password
            };

            const requestUrl = `${this.dbUrl}/users`;

            this.http.put<User>(requestUrl, loginUser, {observe: 'response'}).subscribe(
                (resp: HttpResponse<User>) => this.parseLoginUser(resp),
                (error) => this.parseLoginError(error));

            return;
        }

        this.loginStatusEmitter.emit(2);
    }

    parseLoginUser(resp: HttpResponse<User>) {

        const token = resp.headers.get('token');
        const user: User = resp.body;

        this.initUser(user);

        this.loginStatusEmitter.emit(1);
        this.setLogin(true);
        this.setUser(user);
        this.setToken(token);
        this.getUsers();
        this.getWagersByUserId();

        this.router.navigate(['/user']);
    }

    initUser(user: User) {

        this.followedPlayers = [];
        this.fantasyPlayers = [];
        this.followedTeams = [];
        this.fantasyTeams = [];

        for (const player of user.players) {

            if (player.type === 'FOLLOWED') {

                this.followedPlayers.push(player);

            } else {

                this.fantasyPlayers.push(player);
            }
        }

        for (const team of user.teams) {

            if (team.type === 'FOLLOWED') {

                this.followedTeams.push(team);

            } else {

                this.fantasyTeams.push(team);
            }
        }

        this.fantasyTeams.sort((t1: UserTeam, t2: UserTeam) => {

                if (t1.id > t2.id) {

                    return 1;
                }

                if (t1.id < t2.id) {

                    return -1;
                }

                return 0;
            }
            );

        window.sessionStorage.setItem('followedPlayers', JSON.stringify(this.followedPlayers));
        window.sessionStorage.setItem('followedTeams', JSON.stringify(this.followedTeams));

        window.sessionStorage.setItem('fantasyPlayers', JSON.stringify(this.fantasyPlayers));
        window.sessionStorage.setItem('fantasyTeams', JSON.stringify(this.fantasyTeams));
    }

    parseLoginError(error) {

        this.loginStatusEmitter.emit(3);
    }

    signUp(username: string, password: string, confirmationPassword: string) {

        if (username === '' || password === '' || confirmationPassword === '') {

            this.signupStatusEmitter.emit(6);

        } else if (password !== confirmationPassword) {

            this.signupStatusEmitter.emit(4);

        } else if (password.match(this.passwordFilter) === null) {

            this.signupStatusEmitter.emit(3);

        } else if (username.match(this.emailFilter) === null) {

            this.signupStatusEmitter.emit(2);

        } else {

            const newUser: UserLogin = {

                email: username,
                password
            };

            this.addUser(newUser);
        }

    }

    findUser(id: number): User {

        return this.findUserHelper(id, 0, this.users.length - 1);
    }

    findUserHelper(id: number, min: number, max: number): User {

        const idx = Math.floor((max + min) / 2);

        if (min > max) {

            return null;
        }

        if (this.users[idx].id === id) {

            return this.users[idx];

        } else if (this.users[idx].id > id) {

            return this.findUserHelper(id, min, idx - 1);

        } else {

            return this.findUserHelper(id, idx + 1, max);
        }
    }

    /*
        #####################
        COMMUNICATION METHODS
        #####################
    */

    getUsers() {

        const requestUrl = `${this.dbUrl}/users`;

        this.http.get<User[]>(requestUrl, this.makeHeaders(this.user.id, this.token)).subscribe(
            (users: User[]) => this.setUsers(users)
        );
    }


    addUser(user: UserLogin) {

        const requestUrl = `${this.dbUrl}/users`;

        this.http.post<User>(requestUrl, user, {observe: 'response'}).subscribe(
            (resp: HttpResponse<User>) => {
                this.parseLoginUser(resp);
                this.signupStatusEmitter.emit(1);
            },

            (error) => this.signupStatusEmitter.emit(5)
        );
    }

    updateUser() {

        const requestUrl = `${this.dbUrl}/users/${this.user.id}`;
        const httpOptions = {

            headers: new HttpHeaders(
                {
                    user_id: this.user.id.toString(),
                    token: this.token
                }
            ),

            params: {

                user_id: this.user.id.toString()
            }
        };

        this.http.put<User>(requestUrl, this.user, httpOptions).subscribe(

            (user: User) => {

                window.sessionStorage.setItem('user', JSON.stringify(this.user));
            },

            error => console.log(error)
        );
    }

    addFollowedPlayer(newPlayer: NewPlayer) {

        const requestUrl = `${this.dbUrl}/players`;
        const httpOptions = {

            headers: new HttpHeaders(
                {
                    user_id: this.user.id.toString(),
                    token: this.token
                }
            ),

            params: {

                user_id: this.user.id.toString()
            }
        };

        this.http.post<UserPlayer>(requestUrl, newPlayer, httpOptions).subscribe(

            (player: UserPlayer) => {
                this.followedPlayers.push(player);
                window.sessionStorage.setItem('followedPlayers', JSON.stringify(this.followedPlayers));
            },

            error => console.log(error)
        );
    }

    deleteFollowedPlayer(userPlayer: UserPlayer, idx: number) {

        const requestUrl = `${this.dbUrl}/players/${userPlayer.id}`;
        const httpOptions = {

            headers: new HttpHeaders(
                {
                    user_id: this.user.id.toString(),
                    token: this.token
                }
            ),

            params: {

                user_id: this.user.id.toString()
            }
        };

        this.http.delete<UserPlayer>(requestUrl, httpOptions).subscribe(

            (player: UserPlayer) => {
                this.followedPlayers.splice(idx, 1);
                window.sessionStorage.setItem('followedPlayers', JSON.stringify(this.followedPlayers));
            },

            error => console.log(error)
        );
    }

    addFollowedTeam(newTeam: NewTeam) {

        const requestUrl = `${this.dbUrl}/teams`;
        const httpOptions = {

            headers: new HttpHeaders(
                {
                    user_id: this.user.id.toString(),
                    token: this.token
                }
            ),

            params: {

                user_id: this.user.id.toString()
            }
        };

        this.http.post<UserTeam>(requestUrl, newTeam, httpOptions).subscribe(

            (team: UserTeam) => {
                this.followedTeams.push(team);
                window.sessionStorage.setItem('followedTeams', JSON.stringify(this.followedTeams));
            },

            error => console.log(error)
        );
    }

    deleteFollowedTeam(userTeam: UserTeam, idx: number) {

        const requestUrl = `${this.dbUrl}/teams/${userTeam.id}`;
        const httpOptions = {

            headers: new HttpHeaders(
                {
                    user_id: this.user.id.toString(),
                    token: this.token
                }
            ),

            params: {

                user_id: this.user.id.toString()
            }
        };

        this.http.delete<UserTeam>(requestUrl, httpOptions).subscribe(

            (team: UserTeam) => {
                this.followedTeams.splice(idx, 1);
                window.sessionStorage.setItem('followedTeams', JSON.stringify(this.followedTeams));
            },

            error => console.log(error)
        );
    }

    addFantasyTeam(newTeam: NewTeam) {

        const requestUrl = `${this.dbUrl}/teams`;
        const httpOptions = {

            headers: new HttpHeaders(
                {
                    user_id: this.user.id.toString(),
                    token: this.token
                }
            ),

            params: {

                user_id: this.user.id.toString()
            }
        };

        this.http.post<UserTeam>(requestUrl, newTeam, httpOptions).subscribe(

            (team: UserTeam) => {
                this.fantasyTeams.push(team);
                window.sessionStorage.setItem('fantasyTeams', JSON.stringify(this.fantasyTeams));
            },

            error => console.log(error)
        );
    }

    deleteFantasyTeam(userTeam: UserTeam, idx: number) {

        const requestUrl = `${this.dbUrl}/teams/${userTeam.id}`;
        const httpOptions = {

            headers: new HttpHeaders(
                {
                    user_id: this.user.id.toString(),
                    token: this.token
                }
            ),

            params: {

                user_id: this.user.id.toString()
            }
        };

        this.http.delete<UserTeam>(requestUrl, httpOptions).subscribe(

            (team: UserTeam) => {
                this.fantasyTeams.splice(idx, 1);
                this.fantasyTeams = [...this.fantasyTeams];
                window.sessionStorage.setItem('fantasyTeams', JSON.stringify(this.fantasyTeams));
            },

            error => console.log(error)
        );
    }

    updateFantasyTeam(userTeam: UserTeam) {

        const requestUrl = `${this.dbUrl}/teams/${userTeam.id}`;
        const httpOptions = {

            headers: new HttpHeaders(
                {
                    user_id: this.user.id.toString(),
                    token: this.token
                }
            ),

            params: {

                user_id: this.user.id.toString()
            }
        };

        this.http.put<UserTeam>(requestUrl, userTeam, httpOptions).subscribe(

            (team: UserTeam) => {
                this.fantasyTeams[this.findFantasyTeamById(team.id)] = team;
                window.sessionStorage.setItem('fantasyTeams', JSON.stringify(this.fantasyTeams));
            },

            error => console.log(error)
        );
    }

    addFantasyPlayer(team: UserTeam, newPlayer: NewPlayer) {

        const requestUrl = `${this.dbUrl}/players`;
        const httpOptions = {

            headers: new HttpHeaders(
                {
                    user_id: this.user.id.toString(),
                    token: this.token
                }
            ),

            params: {

                team_id: team.id.toString()
            }
        };

        this.http.post<UserPlayer>(requestUrl, newPlayer, httpOptions).subscribe(

            (player: UserPlayer) => {

                this.fantasyTeams[this.findFantasyTeamById(team.id)].players =
                    this.fantasyTeams[this.findFantasyTeamById(team.id)].players.concat(player);

                window.sessionStorage.setItem('fantasyTeams', JSON.stringify(this.fantasyTeams));
            },

            error => console.log(error)
        );
    }

    deleteFantasyPlayer(team: UserTeam, userPlayer: UserPlayer) {

        const requestUrl = `${this.dbUrl}/players/${userPlayer.id}`;
        const httpOptions = {

            headers: new HttpHeaders(
                {
                    user_id: this.user.id.toString(),
                    token: this.token
                }
            ),

            params: {

                team_id: team.id.toString()
            }
        };

        this.http.delete<UserPlayer>(requestUrl, httpOptions).subscribe(

            (player: UserPlayer) => {

                const teamIdx = this.findFantasyTeamById(team.id);
                const playerIdx = this.findFantasyPlayerById(userPlayer.id, teamIdx);

                this.fantasyTeams[teamIdx].players.splice(playerIdx, 1);
                this.fantasyTeams[teamIdx].players = [...this.fantasyTeams[teamIdx].players];
                window.sessionStorage.setItem('fantasyTeams', JSON.stringify(this.fantasyTeams));
            },

            error => console.log(error)
        );
    }

    getWagersByUserId() {

        const requestUrl = `${this.dbUrl}/wagers`;
        const httpOptions = {

            headers: new HttpHeaders(
                {
                    user_id: this.user.id.toString(),
                    token: this.token
                }
            ),

            params: {

                user_id: this.user.id.toString()
            }
        };

        this.http.get<UserWager[]>(requestUrl, httpOptions).subscribe(

            (wagers: UserWager[]) => {

                this.wagers = [...wagers].sort((w1: UserWager, w2: UserWager) => {

                        if (w1.id > w2.id) {

                            return 1;

                        } else if ( w1.id < w2.id) {

                            return -1;
                        }

                        return 0;
                    }
                );

                window.sessionStorage.setItem('wagers', JSON.stringify(this.wagers));
            },

            error => console.log(error)
        );
    }

    addNewWager(newWager: NewWager) {

        const requestUrl = `${this.dbUrl}/wagers`;
        const httpOptions = {

            headers: new HttpHeaders(
                {
                    user_id: this.user.id.toString(),
                    token: this.token
                }
            ),

            params: {

                user_id: this.user.id.toString()
            }
        };

        this.http.post<UserWager>(requestUrl, newWager, httpOptions).subscribe(

            (wager: UserWager) => {

                this.wagers.push(wager);
                window.sessionStorage.setItem('wagers', JSON.stringify(this.wagers));
            },

            error => console.log(error)
        );
    }

    updateWager(userWager: UserWager) {

        const requestUrl = `${this.dbUrl}/wagers/${userWager.id}`;
        const httpOptions = {

            headers: new HttpHeaders(
                {
                    user_id: this.user.id.toString(),
                    token: this.token
                }
            )
        };

        this.http.put<UserWager>(requestUrl, userWager, httpOptions).subscribe(

            (wager: UserWager) => {

                this.wagers[this.findWagerById(wager.id)] = wager;
                window.sessionStorage.setItem('wagers', JSON.stringify(this.wagers));
            },

            error => console.log(error)
        );
    }

    /*
        #######################
        BROWSER SESSION METHODS
        #######################
    */

    setLogin(value) {

        window.sessionStorage.setItem('loggedIn', value);
        this.loggedIn = value;
        this.loginEmitter.emit(value);
    }

    getLoginStatus() {

        return this.loginEmitter;
    }

    setUser(user) {

        window.sessionStorage.setItem('user', JSON.stringify(user));
        this.user = user;
        this.userEmitter.emit(user);
    }

    setUsers(users: User[]) {

        const sortedUsers: User[] = [...users].sort((u1: User, u2: User) => {

            if (u1.id > u2.id) {

                return 1;
            }

            if (u1.id < u2.id) {

                return -1;
            }

            return 0;
        });

        window.sessionStorage.setItem('users', JSON.stringify(sortedUsers));
        this.users = sortedUsers;
        this.usersEmitter.emit(sortedUsers);
    }

    setToken(token) {

        window.sessionStorage.setItem('token', JSON.stringify(token));
        this.token = token;
    }

    clean() {

        this.setLogin(false);
        this.setUser(null);

        this.loggedIn = false;
        this.user = null;
    }
}
