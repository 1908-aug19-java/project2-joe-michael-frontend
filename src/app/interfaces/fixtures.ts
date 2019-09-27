export interface Fixtures {
    api: API;
}

export interface API {
    results: number;
    fixtures: Fixture[];
}

export interface Fixture {
    fixture_id: number;
    league_id: number;
    event_date: Date;
    event_timestamp: number;
    firstHalfStart: number | null;
    secondHalfStart: number | null;
    round: string;
    status: Status;
    statusShort: StatusShort;
    elapsed: number;
    venue: null | string;
    referee: null;
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
    halftime: Halftime | null;
    fulltime: null | string;
    extratime: null;
    penalty: null;
}

export enum Halftime {
    The00 = '0-0',
    The01 = '0-1',
    The10 = '1-0',
    The12 = '1-2',
}

export enum Status {
    FirstHalf = 'First Half',
    Halftime = 'Halftime',
    MatchFinished = 'Match Finished',
    NotStarted = 'Not Started',
}

export enum StatusShort {
    Ft = 'FT',
    HT = 'HT',
    NS = 'NS',
    The1H = '1H',
}
