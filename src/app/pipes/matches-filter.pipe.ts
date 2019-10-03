import { Pipe, PipeTransform } from '@angular/core';
import { Fixtures, Fixture, StatusShort } from '../interfaces/fixtures';

@Pipe({
    name: 'matchesFilter'
})
export class MatchesFilterPipe implements PipeTransform {

    transform(items: Fixture[], filter: number): Fixture[] {

        if (!items || !filter) {

            return items;
        }

        return items.filter(
            (item: Fixture) => filter === 1 ? item.statusShort === StatusShort.Ft : item.statusShort !== StatusShort.Ft
        );

    }

}
