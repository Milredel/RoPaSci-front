import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiClass, ReqContentType } from '../api/api.class';
import { environment } from '../../../environments/environment';
import { RestCallService } from '../restcall/rest-call.service';
import { Router } from '@angular/router';
import { GameModel } from '../../models/game.model';

@Injectable()
export class GameService extends ApiClass {
    nextGame: GameModel;

    constructor(public http: HttpClient,
                private restCallService: RestCallService,
                private router: Router) {
        super(http);
    }

    public initNextGame(game: GameModel | null): Promise<void> {
        const restCall = this.http
            .post(`${environment.BACKEND_URL}/games/createGame`, game, {
                headers: this.getHeaders(),
                responseType: ReqContentType.Json,
                observe: 'response'
            }).toPromise();

        const onComplete = (response: any) => {
            if (response && response.ok) {
                this.nextGame = response.body;
                this.router.navigate([`/main/game/${this.nextGame._id}`]);
            }

            throw new Error(`An error has occured during game creation: ` + response.message);
        };

        return this.restCallService.doRestCall(restCall, null,
            {onComplete: onComplete.bind(this), onError: this.handleError.bind(this)});
    }

    public getAllPendingGames(): Promise<GameModel[]> {
        this.requesting = true;

        const restCall: Promise<GameModel> = this.http
          .get<GameModel>(`${environment.BACKEND_URL}/games/pending`, {
            headers: this.getHeaders(),
            responseType: ReqContentType.Json
          }).toPromise();

        return this.restCallService.doRestCall(restCall, null,
          {onComplete: this.defaultOnCompete.bind(this), onError: this.handleError.bind(this)});
    }

    public getGameFromId(id: string): Promise<GameModel> {
        this.requesting = true;

        const restCall: Promise<GameModel> = this.http
          .get<GameModel>(`${environment.BACKEND_URL}/games/${id}`, {
            headers: this.getHeaders(),
            responseType: ReqContentType.Json
          }).toPromise();

        return this.restCallService.doRestCall(restCall, null,
          {onComplete: this.defaultOnCompete.bind(this), onError: this.handleError.bind(this)});
    }

    public postGameMove(gameId: string, round: number, move: string, isComputer: boolean = false): Promise<GameModel> {
        const params = {
            gameId: gameId,
            round: round,
            move: move
        };
        if (isComputer) {
            Object.assign(params, {isComputer: true});
        }
        const restCall = this.http
            .post(`${environment.BACKEND_URL}/games/move`, params, {
                headers: this.getHeaders(),
                responseType: ReqContentType.Json,
                observe: 'response'
            }).toPromise();

        const onComplete = (response: any) => {
            if (response && response.ok) {
                return response.body;
            }

            throw new Error(`An error has occured during game move creation: ` + response.message);
        };

        return this.restCallService.doRestCall(restCall, null,
            {onComplete: onComplete.bind(this), onError: this.handleError.bind(this)});
    }
}
