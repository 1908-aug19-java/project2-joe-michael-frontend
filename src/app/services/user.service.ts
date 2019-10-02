import { Injectable, Input, Output, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';

import { User, UserLogin, UserTeam, UserPlayer, NewPlayer, NewTeam } from '../interfaces/user';
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
    token = window.sessionStorage.getItem('token');

    users: User[] = JSON.parse(window.sessionStorage.getItem('users')) || [];

    fantasyTeams: UserTeam[] = JSON.parse(window.sessionStorage.getItem('fantasyTeams')) || [];
    fantasyPlayers: UserPlayer[] = JSON.parse(window.sessionStorage.getItem('fantasyPlayers')) || [];
    followedTeams: UserTeam[] = JSON.parse(window.sessionStorage.getItem('followedTeams')) || [];
    followedPlayers: UserPlayer[] = JSON.parse(window.sessionStorage.getItem('followedPlayers')) || [];

    httpRequestQueue = [];

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

        console.log(this.followedPlayers);

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

    makeHeaders(userId: number, token: string) {

        const httpOptions = {
            headers: new HttpHeaders({
                user_id: userId.toString(),
                token
            }),
        };

        return httpOptions;
    }

    // Status Codes
    // 0 - Null
    // 1 - Login Success
    // 2 - Invalid Username Format
    // 3 - Invalid Username Password Combination

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
    }

    getUsers() {

        const requestUrl = `${this.dbUrl}/users`;

        this.http.get<User[]>(requestUrl, this.makeHeaders(this.user.id, this.token)).subscribe(
            (users: User[]) => this.setUsers(users)
        );
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

    addFollowedPlayer(newPlayer: NewPlayer) {

        const requestUrl = `${this.dbUrl}/players`;

        const httpOptions = {

            headers: new HttpHeaders(
                {
                    user_id: this.user.id.toString(),
                    token: this.token.substring(1, this.token.length - 1)
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
                    token: this.token.substring(1, this.token.length - 1)
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
                    token: this.token.substring(1, this.token.length - 1)
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
                    token: this.token.substring(1, this.token.length - 1)
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

    parseLoginError(error) {

        this.loginStatusEmitter.emit(3);
    }

    // Status Codes
    // 0 - Null
    // 1 - Signup success
    // 2 - Invalid Username / Email Format
    // 3 - Invalid Password format
    // 4 - Invalid Passwords - Don't match
    // 5 - Username Already Taken
    // 6 - Fields not all filled

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

    getUser() {

        return this.userEmitter;
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
}
