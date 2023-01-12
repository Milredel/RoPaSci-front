import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiClass, ReqContentType } from '../api/api.class';
import { environment } from '../../../environments/environment';
import { RestCallService } from '../restcall/rest-call.service';
import { Router } from '@angular/router';
import { GAME } from '../../constants';
import { GameModel } from '../../models/game.model';
import { WindowService } from '../window/window.service';
import { GuidUtils } from '../../utils/guid.utils';
import { ApiAuthService } from '../auth/auth.service';

@Injectable()
export class GameService extends ApiClass {
    nextGame = <GameModel>{
        roundNumber: 3,
        mode: GAME.MODE.CLASSIC,
        opponent: GAME.OPPONENT.COMPUTER
    };

    constructor(public http: HttpClient,
                private restCallService: RestCallService,
                private router: Router,
                private windowService: WindowService,
                private apiAuthService: ApiAuthService) {
        super(http);
    }

    public initNextGame(game: GameModel | null): Promise<any> {
        const restCall = this.http
            .post(`${environment.BACKEND_URL}/games/createGame`, game, {
                headers: this.getHeaders(),
                responseType: ReqContentType.Json,
                observe: 'response'
            }).toPromise();

        const onComplete = (response: any) => {
            if (response && response.ok) {
                this.nextGame = {...game};
                this.router.navigate([`/main/game`]);
            }

            throw new Error(`An error has occured during game creation: ` + response.message);
        };

        return this.restCallService.doRestCall(restCall, null,
            {onComplete: onComplete.bind(this), onError: this.handleError.bind(this)});
    }

    public getAllGames(): Promise<GameModel[]> {
        this.requesting = true;

        const restCall: Promise<GameModel> = this.http
          .get<GameModel>(`${environment.BACKEND_URL}/games`, {
            headers: this.getHeaders(),
            responseType: ReqContentType.Json
          }).toPromise();

        return this.restCallService.doRestCall(restCall, null,
          {onComplete: this.defaultOnCompete.bind(this), onError: this.handleError.bind(this)});
      }
}
