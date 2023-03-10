import { RoundModel } from './round.model';
import { StatusModel } from './status.model';

export class GameModel {
    _id: string;
    roundNumber: number;
    mode: string;
    opponent: string;
    rounds: RoundModel[];
    status: StatusModel;

    constructor(id: string, roundNumber: number, mode: string, opponent: string) {
      this._id = id;
      this.roundNumber = roundNumber;
      this.mode = mode;
      this.opponent = opponent;
    }

}
