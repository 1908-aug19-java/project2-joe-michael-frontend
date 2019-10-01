import { Pipe, PipeTransform } from '@angular/core';
import { Fixtures, Fixture } from '../interfaces/fixtures';
import { LeagueRef, League, Leagues } from '../interfaces/leagues';

@Pipe({
    name: 'upcomingLeagueFilter'
})

export class UpcomingLeagueFilterPipe implements PipeTransform {

    leagues: League[] = LeagueRef.api.leagues;

    transform(fixtures: Fixture[], sortOptions?): any {

        const map = sortOptions[0];
        const opt = sortOptions[1];

        if (opt === 0) {

            return fixtures;
        }

        return fixtures.filter((fixture: Fixture) => this.filterHelper(fixture, map, opt - 1));
    }

    filterHelper(fixture: Fixture, map, opt) {

        const league = this.findLeague(fixture.league_id, 0);

        if (league === null) {

            return 0;
        }

        return league.name === map[opt];
    }

    findLeague(guess: number, last: number): League {

        const init: League = this.leagues[guess - 1 + last];

        if (init === undefined) {

            return null;
        }

        if (init.league_id > guess) {

            if (last >= 1) {

                return null;
            }

            return this.findLeague(guess, last - 1);
        }

        if (init.league_id < guess) {

            if (last <= -1) {

                return null;
            }

            return this.findLeague(guess, last + 1);
        }

        return init;
    }
}
