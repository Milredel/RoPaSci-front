import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GAME } from '../../../../../constants';
import { GameService } from 'src/app/services/game/game.service';
import { GameModel } from 'src/app/models/game.model';
import { ApiAuthService } from 'src/app/services/auth/auth.service';
import { JwtDecoded } from 'src/app/interfaces/JwtDecoded.interface';

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

    constructor(public apiAuthSrv: ApiAuthService,
                private router: Router,
                private gameService: GameService) { }

    ngOnInit() {
        console.log(this.gameService.nextGame);
        const decoded: JwtDecoded = this.apiAuthSrv.getJwtTokenDecoded();
        this.username = decoded?.username || 'guest';
        this.game = this.gameService.nextGame;
    }

}
