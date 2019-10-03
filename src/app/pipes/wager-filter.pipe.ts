import { Pipe, PipeTransform } from '@angular/core';

import { UserWager } from '../interfaces/user';

@Pipe({
    name: 'wagerFilter'
})

export class WagerFilterPipe implements PipeTransform {

    transform(wagers: UserWager[], filter: number): UserWager[] {

        switch (filter) {

            case 0:

                return wagers.sort(this.newestFirst);

            case 1:

                return wagers.filter((wager: UserWager) => {

                        return (wager.accepted === true) && (wager.resolution === 0);
                    }
                );

            case 2:

                return wagers.filter((wager: UserWager) => {

                        return wager.accepted === false && wager.resolution !== 4;
                    }
                );

            case 3:

                return wagers.filter((wager: UserWager) => {

                        return ((wager.accepted === true) && (wager.resolution !== 0)) || (wager.resolution === 4) ;
                    }
                );
        }
    }

    newestFirst(w1: UserWager, w2: UserWager) {

        if (w1.id > w2.id) {

            return -1;
        }

        if (w1.id < w2.id) {

            return 1;
        }

        return 0;
    }
}

