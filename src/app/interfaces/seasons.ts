export interface Seasons {
    api: API;
}

export interface API {
    results: number;
    seasons: number[];
}

export const SeasonsList: Seasons = {
    api: {
        results: 12,
        seasons: [
            2008,
            2010,
            2011,
            2012,
            2013,
            2014,
            2015,
            2016,
            2017,
            2018,
            2019,
            2020
        ]
    }
};
