import { ScoreModel } from './score.model';

export class StatusModel {
    status: string; // pending | ended
    score: ScoreModel;
    winner?: string; // creator | opponent | draw
    createdAt: Date;
    endedAt?: Date;
    currentRound: number;
}
