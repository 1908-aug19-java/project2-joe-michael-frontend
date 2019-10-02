export interface User {
    id: number;
    email: string;
    password: string;
    acct_level: number;
    name: string;
    players: UserPlayer[];
    teams: UserTeam[];
    streak: UserStreak;
}

export interface UserPlayer {
    id: number;
    api_player_id: number;
    name: string;
    type: string;
}

export interface UserStreak {
    id: number;
    current_streak: number;
    longest_streak: number;
    api_game_id: number;
    guess: number;
}

export interface UserTeam {
    id: number;
    api_team_id: number;
    api_league_id: number;
    name: string;
    type: string;
    players: any[];
}

export interface UserLogin {

    email: string;
    password: string;
}

export interface NewPlayer {

    api_player_id: number;
    name: string;
    type: string;
}

export interface NewTeam {

    api_team_id: number;
    api_league_id: number;
    name: string;
    type: string;
    players: any[];
}
