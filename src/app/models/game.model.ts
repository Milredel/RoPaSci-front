export class GameModel {
    public id: number;
    public roundNumber: number;
    public mode: string;
    public opponent: string;

    constructor(id: number, roundNumber: number, mode: string, opponent: string) {
      this.id = id;
      this.roundNumber = roundNumber;
      this.mode = mode;
      this.opponent = opponent;
    }

}
