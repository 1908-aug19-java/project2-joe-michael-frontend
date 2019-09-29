export interface Players {
    api: API;
}

export interface API {
    results: number;
    players: Player[];
}

export interface Player {
    player_id: number;
    player_name: string;
    firstname: string;
    lastname: string;
    number: string;
    position: Position;
    age: number;
    birth_date: string;
    birth_place: null | string;
    birth_country: string;
    nationality: string;
    height: null | string;
    weight: null | string;
    injured: null;
    rating: null;
    team_id: number;
    team_name: string;
    league: string;
    season: string;
    captain: number;
    shots: Shots;
    goals: Goals;
    passes: Passes;
    tackles: Tackles;
    duels: Duels;
    dribbles: Dribbles;
    fouls: Fouls;
    cards: Cards;
    penalty: Penalty;
    games: Games;
    substitutes: Substitutes;
}

export interface Cards {
    yellow: number;
    yellowred: number;
    red: number;
}

export interface Dribbles {
    attempts: number;
    success: number;
}

export interface Duels {
    total: number;
    won: number;
}

export interface Fouls {
    drawn: number;
    committed: number;
}

export interface Games {
    appearences: number;
    minutes_played: number;
    lineups: number;
}

export interface Goals {
    total: number;
    conceded: number;
    assists: number;
}

export interface Passes {
    total: number;
    accuracy: number;
}

export interface Penalty {
    success: number;
    missed: number;
    saved: number;
}

export interface Shots {
    total: number;
    on: number;
}

export interface Substitutes {
    in: number;
    out: number;
    bench: number;
}

export interface Tackles {
    total: number;
    blocks: number;
    interceptions: number;
}
