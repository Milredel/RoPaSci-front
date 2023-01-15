import { MoveModel } from './move.model';

export class RoundModel {
    creatorMove?: MoveModel;
    opponentMove?: MoveModel;
    winner?: string; // creator | opponent | draw
    createdAt: Date;
    endedAt?: Date;
}
