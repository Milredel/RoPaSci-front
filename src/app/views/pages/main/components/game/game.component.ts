import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GAME } from '../../../../../constants';
import { GameService } from 'src/app/services/game/game.service';
import { GameModel } from 'src/app/models/game.model';
import { ApiAuthService } from 'src/app/services/auth/auth.service';
import { JwtDecoded } from 'src/app/interfaces/JwtDecoded.interface';
import { MathUtils } from '../../../../../utils/math.utils';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {

  username: string;
  game: GameModel;
  currentRound: number;
  MODES = GAME.MODE;
  gameId: string;
  playersChoice: string;
  opponentsChoice = 'question';
  canGoToNextRound = false;
  roundResultText: string;
  gameIsEnded = false;
  gameResultText: string;

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

  /**
   * Initialize new game, taking the one in gameService or retrieving it from the request game id
   *
   * @returns {Promise<void>}
   * @memberof GameComponent
   */
  async initGame(): Promise<void> {
    this.game = this.gameService.nextGame;
    this.playersChoice = null;
    this.opponentsChoice = 'question';
    this.canGoToNextRound = false;
    this.roundResultText = null;
    this.gameIsEnded = false;
    this.gameResultText = null;
    if (!this.game) {
      this.game = await this.gameService.getGameFromId(this.gameId);
    }
    this.currentRound = this.game.status.currentRound;
  }

  /**
   * Plays a move, actually here, two (yours, and the computer's one)
   *
   * @param {string} move
   * @returns {Promise<void>}
   * @memberof GameComponent
   */
  async playMove(move: string): Promise<void> {
    await this.gameService.postGameMove(this.gameId, this.currentRound, move);
    this.playersChoice = move;
    const gameChoices = this.MODES[this.game.mode.toUpperCase()].CHOICES;
    const opponentMove = gameChoices[MathUtils.getRandomIntWithMax(gameChoices.length) - 1];
    const updatedGame = await this.gameService.postGameMove(this.gameId, this.currentRound, opponentMove, true);
    this.opponentsChoice = opponentMove;
    this.checkFinalActions(updatedGame);
  }

  /**
   * Potential additional actions to be performed after a move from the round is received
   *
   * @param {GameModel} updatedGame
   * @memberof GameComponent
   */
  checkFinalActions(updatedGame: GameModel): void {
    if (updatedGame.status.currentRound !== this.currentRound) {
      this.roundResultText = this.getRoundResultText(updatedGame);
      this.canGoToNextRound = true;
      this.gameService.nextGame = updatedGame;
      if (updatedGame.status.status === 'ended') {
        this.gameIsEnded = true;
        this.gameResultText = this.getGameResultText(updatedGame);
      }
    }
  }

  /**
   * Returns full text when we have a winner of a round
   *
   * @param {GameModel} game
   * @returns {string}
   * @memberof GameComponent
   */
  getRoundResultText(game: GameModel): string {
    switch (game.rounds[this.currentRound - 1].winner) {
      case 'draw':
        return `That's a draw !`;
      case 'creator':
        return 'You win !';
      case 'opponent':
        return 'You lose !';
    }
  }

  /**
   * Returns full text when we have a winner of a game
   *
   * @param {GameModel} game
   * @returns {string}
   * @memberof GameComponent
   */
  getGameResultText(game: GameModel): string {
    switch (game.status.winner) {
      case 'draw':
        return `You're as strong as your opponent, that's a draw !`;
      case 'creator':
        return 'Congratulations, you won this match !';
      case 'opponent':
        return 'Oh no, you lose the match !';
    }
  }

  /**
   * Reinitialize game
   *
   * @memberof GameComponent
   */
  goToNextRound(): void {
    this.initGame();
  }

  /**
   * Navigate to games page
   *
   * @memberof GameComponent
   */
  goToGames(): void {
    this.router.navigate(['/main/home']);
  }
}
