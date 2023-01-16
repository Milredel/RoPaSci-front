import { HttpClient } from '@angular/common/http';
import { ReqContentType } from '../api/api.class';
import { environment } from '../../../environments/environment';
import { createStub, expect, stub, stubClass } from '../../../test';
import { RestCallService } from '../restcall/rest-call.service';
import { Router } from '@angular/router';
import { GameModel } from '../../models/game.model';
import { GameService } from './game.service';

describe('GameService', () => {
    let service: GameService;
    let http: HttpClient;
    let restCallService: RestCallService;
    let router: Router;

    beforeEach(() => {
        service = new GameService(
            http = stubClass(HttpClient),
            restCallService = stubClass(RestCallService),
            router = stubClass(Router)
        );
    });

    it('should init the service', () => {
        return expect(service).to.not.be.undefined;
    });

    describe('initNextGame', () => {
        it('should call the restcall service', async () => {
            stub(http, 'post').callsFake(() => {
                return {toPromise: () => null};
            });
            stub(restCallService, 'doRestCall').callsFake(() => 'a restcall response');
            stub(service, 'getHeaders').callsFake(() => {
                return {some: 'headers'};
            });

            const res = await service.initNextGame({some: 'game data'} as any);

            return (expect(http.post) as any).to.have.been.calledWith(
                    `${environment.BACKEND_URL}/games/createGame`, {some: 'game data'}, {
                        headers: {some: 'headers'},
                        responseType: ReqContentType.Json,
                        observe: 'response'
                    }
                ) && expect(res).to.be.deep.eq('a restcall response');
        });
    });

    describe('getAllPendingGames', () => {
        it('should call the restcall service', async () => {
            stub(http, 'get').callsFake(() => {
                return {toPromise: () => null};
            });
            stub(restCallService, 'doRestCall').callsFake(() => 'a restcall response');
            stub(service, 'getHeaders').callsFake(() => {
                return {some: 'headers'};
            });

            const res = await service.getAllPendingGames();

            return (expect(http.get) as any).to.have.been.calledWith(
                    `${environment.BACKEND_URL}/games/pending`, {
                        headers: {some: 'headers'},
                        responseType: ReqContentType.Json
                    }
                ) && expect(res).to.be.deep.eq('a restcall response');
        });
    });

    describe('getGameFromId', () => {
        it('should call the restcall service', async () => {
            stub(http, 'get').callsFake(() => {
                return {toPromise: () => null};
            });
            stub(restCallService, 'doRestCall').callsFake(() => 'a restcall response');
            stub(service, 'getHeaders').callsFake(() => {
                return {some: 'headers'};
            });

            const res = await service.getGameFromId('666');

            return (expect(http.get) as any).to.have.been.calledWith(
                    `${environment.BACKEND_URL}/games/666`, {
                        headers: {some: 'headers'},
                        responseType: ReqContentType.Json
                    }
                ) && expect(res).to.be.deep.eq('a restcall response');
        });
    });

    describe('postGameMove', () => {
        it('should call the restcall service with good params if not computer', async () => {
            stub(http, 'post').callsFake(() => {
                return {toPromise: () => null};
            });
            stub(restCallService, 'doRestCall').callsFake(() => 'a restcall response');
            stub(service, 'getHeaders').callsFake(() => {
                return {some: 'headers'};
            });

            const res = await service.postGameMove('666', 1, 'rock');

            const expectedParams = {
                gameId: '666',
                round: 1,
                move: 'rock'
            };
            return (expect(http.post) as any).to.have.been.calledWith(
                    `${environment.BACKEND_URL}/games/move`, expectedParams, {
                        headers: {some: 'headers'},
                        responseType: ReqContentType.Json,
                        observe: 'response'
                    }
                ) && expect(res).to.be.deep.eq('a restcall response');
        });

        it('should call the restcall service with good params if computer', async () => {
            stub(http, 'post').callsFake(() => {
                return {toPromise: () => null};
            });
            stub(restCallService, 'doRestCall').callsFake(() => 'a restcall response');
            stub(service, 'getHeaders').callsFake(() => {
                return {some: 'headers'};
            });

            const res = await service.postGameMove('666', 1, 'rock', true);

            const expectedParams = {
                gameId: '666',
                round: 1,
                move: 'rock',
                isComputer: true
            };
            return (expect(http.post) as any).to.have.been.calledWith(
                    `${environment.BACKEND_URL}/games/move`, expectedParams, {
                        headers: {some: 'headers'},
                        responseType: ReqContentType.Json,
                        observe: 'response'
                    }
                ) && expect(res).to.be.deep.eq('a restcall response');
        });
    });
});
