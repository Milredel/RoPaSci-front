import { MoveModel } from './move.model';

export class RoundModel {
    creatorMove?: MoveModel;
    opponentMove?: MoveModel;
    createdAt: Date;
}
