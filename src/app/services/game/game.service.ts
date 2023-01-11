import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiClass, ReqContentType } from '../api/api.class';
import { environment } from '../../../environments/environment';
import { RestCallService } from '../restcall/rest-call.service';
import { Router } from '@angular/router';
import { GAME } from '../../constants';
import { GameModel } from '../../models/game.model';

@Injectable()
export class GameService extends ApiClass {
    nextGame = <GameModel>{
        roundNumber: 3,
        mode: GAME.MODE.CLASSIC,
        opponent: GAME.OPPONENT.COMPUTER
    };

    public initNextGame(options: GameModel | null) {
        this.nextGame = {...options};
    }
}
