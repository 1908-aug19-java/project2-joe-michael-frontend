export interface Leagues {
    api: API;
}

export interface API {
    results: number;
    leagues: League[];
}

export interface League {
    league_id: number;
    name: string;
    type: string;
    country: string;
    country_code: string;
    season: number;
    season_start: Date;
    season_end: Date;
    logo: string;
    flag: string;
    standings: number;
    is_current: number;
}
