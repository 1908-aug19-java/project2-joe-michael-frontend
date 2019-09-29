export interface SeasonStatistics {
    api: API;
}

export interface API {
    results: number;
    statistics: Statistics;
}

export interface Statistics {
    matchs: Matchs;
    goals: Goals;
    goalsAvg: GoalsAvg;
}

export interface Goals {
    goalsFor: GoalsAgainst;
    goalsAgainst: GoalsAgainst;
}

export interface GoalsAgainst {
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

export interface Matchs {
    matchsPlayed: GoalsAgainst;
    wins: GoalsAgainst;
    draws: GoalsAgainst;
    loses: GoalsAgainst;
}
