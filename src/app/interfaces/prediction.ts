export interface Predictions {
    api: API;
}

export interface API {
    results: number;
    predictions: Prediction[];
}

export interface Prediction {
    match_winner: string;
    under_over: null;
    goals_home: string;
    goals_away: string;
    advice: string;
    winning_percent: WinningPercent;
    teams: Teams;
    h2h: H2H[];
    comparison: Comparison;
}

export interface Comparison {
    forme: Att;
    att: Att;
    def: Att;
    fish_law: Att;
    h2h: Att;
    goals_h2h: Att;
}

export interface Att {
    home: string;
    away: string;
}

export interface H2H {
    fixture_id: number;
    league_id: number;
    event_date: Date;
    event_timestamp: number;
    firstHalfStart: number | null;
    secondHalfStart: number | null;
    round: string;
    status: string;
    statusShort: string;
    elapsed: number;
    venue: string;
    referee: null | string;
    homeTeam: Team;
    awayTeam: Team;
    goalsHomeTeam: number | null;
    goalsAwayTeam: number | null;
    score: Score;
}

export interface Team {
    team_id: number;
    team_name: string;
    logo: string;
}

export interface Score {
    halftime: null | string;
    fulltime: null | string;
    extratime: null;
    penalty: null;
}

export interface Teams {
    home: Away;
    away: Away;
}

export interface Away {
    team_id: number;
    team_name: string;
    last_5_matches: Last5Matches;
    all_last_matches: AllLastMatches;
    last_h2h: LastH2H;
}

export interface AllLastMatches {
    matchs: LastH2H;
    goals: Goals;
    goalsAvg: GoalsAvg;
}

export interface Goals {
    goalsFor: Draws;
    goalsAgainst: Draws;
}

export interface Draws {
    home: number;
    away: number;
    total: number;
}

export interface GoalsAvg {
    goalsFor: GoalsAgainstClass;
    goalsAgainst: GoalsAgainstClass;
}

export interface GoalsAgainstClass {
    home: string;
    away: string;
    total: string;
}

export interface LastH2H {
    matchsPlayed?: Draws;
    wins: Draws;
    draws: Draws;
    loses: Draws;
    played?: Draws;
}

export interface Last5Matches {
    forme: string;
    att: string;
    def: string;
    goals: number;
    goals_avg: number;
    goals_against: number;
    goals_against_avg: number;
}

export interface WinningPercent {
    home: string;
    draws: string;
    away: string;
}
