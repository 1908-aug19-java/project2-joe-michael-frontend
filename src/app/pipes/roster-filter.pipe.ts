import { Pipe, PipeTransform } from '@angular/core';
import { Players, Player } from '../interfaces/players';

@Pipe({
    name: 'rosterFilter'
})

export class RosterFilterPipe implements PipeTransform {

    transform(items: Player[], sortIdx: number): Player[] {

        switch (sortIdx) {

            case 1: return items.sort(this.nameSort);
            case 2: return items.sort(this.positionSort);
            case 3: return items.sort(this.nationalitySort);
            case 4: return items.sort(this.ageSort);

            default: return items.sort(this.captainSort);
        }

    }

    captainSort(p1: Player, p2: Player) {

        const c1 = p1.captain;
        const c2 = p2.captain;
        const n1 = p1.player_name;
        const n2 = p2.player_name;

        const roleEnum = {ATTACKER: 1, MIDFIELDER: 2, DEFENDER: 3, GOALKEEPER: 4};
        const r1 = p1.position != null && roleEnum[p1.position.toUpperCase()];
        const r2 = p2.position != null && roleEnum[p2.position.toUpperCase()];

        if (c1 > c2) { return -1; }
        if (c1 < c2) { return 1; }

        if (r1 > r2) { return 1; }
        if (r1 < r2) { return -1; }

        if (n1 > n2) { return 1; }
        if (n1 < n2) { return -1; }

        return 0;
    }

    nameSort(p1: Player, p2: Player) {

        const n1 = p1.player_name;
        const n2 = p2.player_name;

        if (n1 > n2) { return 1; }
        if (n1 < n2) { return -1; }

        return 0;
    }

    positionSort(p1: Player, p2: Player) {

        const n1 = p1.player_name;
        const n2 = p2.player_name;

        const roleEnum = {ATTACKER: 1, MIDFIELDER: 2, DEFENDER: 3, GOALKEEPER: 4};
        const r1 = p1.position != null && roleEnum[p1.position.toUpperCase()];
        const r2 = p2.position != null && roleEnum[p2.position.toUpperCase()];

        if (r1 > r2) { return 1; }
        if (r1 < r2) { return -1; }

        if (n1 > n2) { return 1; }
        if (n1 < n2) { return -1; }

        return 0;
    }

    nationalitySort(p1: Player, p2: Player) {

        const c1 = p1.nationality;
        const c2 = p2.nationality;

        const n1 = p1.player_name;
        const n2 = p2.player_name;

        if (c1 > c2) { return 1; }
        if (c1 < c2) { return -1; }

        if (n1 > n2) { return 1; }
        if (n1 < n2) { return -1; }

        return 0;
    }

    ageSort(p1: Player, p2: Player) {

        const a1 = p1.age;
        const a2 = p2.age;

        if (a1 > a2) { return 1; }
        if (a1 < a2) { return -1; }
    }

}
