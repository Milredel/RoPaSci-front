import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GAME } from '../../../../../constants';
import { GameService } from 'src/app/services/game/game.service';
import { GameModel } from 'src/app/models/game.model';
import { ApiAuthService } from 'src/app/services/auth/auth.service';
import { JwtDecoded } from 'src/app/interfaces/JwtDecoded.interface';
import { MathUtils } from 'src/app/utils/math.utils';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {

    username: string;
    game: GameModel;
    currentRound = 1;
    MODES = GAME.MODE;
    gameId: string;
    playersChoice: string;
    opponentsChoice = 'question';

    constructor(public apiAuthSrv: ApiAuthService,
                private router: Router,
                private gameService: GameService,
                private route: ActivatedRoute) { }

    ngOnInit() {
        const decoded: JwtDecoded = this.apiAuthSrv.getJwtTokenDecoded();
        this.username = decoded?.username || 'guest';
        this.gameId = this.route.snapshot.params.id;
        this.initGame();
    }

    async initGame(): Promise<void> {
      this.game = this.gameService.nextGame;
      if (!this.game) {
        this.game = await this.gameService.getGameFromId(this.gameId);
      }
      this.currentRound = this.game.rounds.length + 1;
    }

    async playMove(move: string): Promise<void> {
      this.game = await this.gameService.postGameMove(this.gameId, this.currentRound, move);
      this.playersChoice = move;
      const gameChoices = this.MODES[this.game.mode.toUpperCase()].CHOICES;
      const opponentMove = gameChoices[MathUtils.getRandomIntWithMax(gameChoices.length) - 1];
      this.game = await this.gameService.postGameMove(this.gameId, this.currentRound, opponentMove, true);
      this.opponentsChoice = opponentMove;
    }
}
