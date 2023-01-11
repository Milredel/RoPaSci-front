import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GAME } from '../../../../../constants';
import { GameService } from 'src/app/services/game/game.service';
import { GameModel } from 'src/app/models/game.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  searchText: string = '';
  headElements = ['Player\'s name', 'Mode', 'Rounds', 'Actions'];

  roundNumber = 3;
  mode = GAME.MODE.CLASSIC;
  opponent = GAME.OPPONENT.COMPUTER;
  MODES = GAME.MODE;
  OPPONENTS = GAME.OPPONENT;

  constructor(private router: Router,
              private gameService: GameService) {
  }

  ngOnInit() {

  }

  public startGame(): void {
    this.gameService.initNextGame(<GameModel>{roundNumber: this.roundNumber, mode: this.mode, opponent: this.opponent});
    this.router.navigate([`/main/game`]);
  }
}
