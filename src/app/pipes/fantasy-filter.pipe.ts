import { Pipe, PipeTransform } from '@angular/core';
import { UserPlayer, UserTeam } from '../interfaces/user';

@Pipe({
    name: 'fantasyFilter'
})

export class FantasyFilterPipe implements PipeTransform {

    transform(players: UserPlayer[], teamPlayers: UserPlayer[]): UserPlayer[] {

        return players.filter((player: UserPlayer) => this.filterHelper(player, teamPlayers));
    }

    filterHelper(player: UserPlayer, teamPlayers: UserPlayer[]): boolean {

        for (const teamPlayer of teamPlayers) {

            if (player.api_player_id === teamPlayer.api_player_id) {

                return false;
            }
        }

        return true;
    }

}
