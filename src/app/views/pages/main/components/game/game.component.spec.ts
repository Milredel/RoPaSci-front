import { MathUtils } from '../../../../../utils/math.utils';
import { expect } from 'chai';
import { GameComponent } from './game.component';
import { ActivatedRoute, Router } from '@angular/router';
import { stub, stubClass } from '../../../../../../test';
import { GameService } from '../../../../../services/game/game.service';
import { ApiAuthService } from '../../../../..//services/auth/auth.service';

describe('GameComponent', () => {
    let component: GameComponent;
    let router: Router;
    let gameService: GameService;
    let apiAuthSrv: ApiAuthService;
    let route: ActivatedRoute;

    beforeEach(() => {
        component = new GameComponent(
            apiAuthSrv = stubClass(ApiAuthService),
            router = stubClass(Router),
            gameService = stubClass(GameService),
            route = {snapshot: {params: {id: 666}}} as any
        );
    });

    it('should init the component', () => {
        return expect(component).to.not.be.undefined;
    });

    describe('ngOnInit', () => {
        it('should call apiAuthSrv.getJwtTokenDecoded and component.initGame', () => {
            stub(apiAuthSrv, 'getJwtTokenDecoded');
            stub(component, 'initGame');
            route = <any>{snapshot: {params: {id: 666}}};
            component.ngOnInit();
            return (expect(apiAuthSrv.getJwtTokenDecoded) as any).to.have.been.called
                && (expect(component.initGame) as any).to.have.been.called;
        });
    });

    describe('initGame', () => {
        it('should call gameService.getGameFromId if no component.game', () => {
            gameService.nextGame = null;
            component.gameId = 'toto';
            stub(gameService, 'getGameFromId');
            component.initGame();
            return (expect(gameService.getGameFromId) as any).to.have.been.calledWith('toto');
        });
    });

    describe('playMove', () => {
        it('should call postGameMove for player\s move, postGameMove for computer and checkFinalActions', async () => {
            stub(gameService, 'postGameMove').callsFake(() => {return {status: {currentRound: 1}}; });
            stub(component, 'checkFinalActions');
            stub(MathUtils, 'getRandomIntWithMax').returns(2);
            component.gameId = 'toto';
            component.currentRound = 1;
            component.game = <any>{mode: 'classic'};
            await component.playMove('rock');
            return (expect(gameService.postGameMove) as any).to.have.callCount(2)
                && (expect(component.checkFinalActions) as any).to.have.been.called
                && (expect(gameService.postGameMove) as any).to.have.been.calledWith('toto', 1, 'rock')
                && (expect(gameService.postGameMove) as any).to.have.been.calledWith('toto', 1, 'paper', true);
        });
    });

    describe('checkFinalActions', () => {
        it('should do nothing if round does not change', () => {
            stub(component, 'getRoundResultText');
            stub(component, 'getGameResultText');
            const game = <any>{status: {currentRound: 1, status: 'pending'}};
            component.currentRound = 1;
            component.checkFinalActions(game);
            return (expect(component.getRoundResultText) as any).to.not.have.been.called
                && (expect(component.getGameResultText) as any).to.not.have.been.called;
        });

        it('should call component.getRoundResultText if round change but if not end game', () => {
            stub(component, 'getRoundResultText');
            stub(component, 'getGameResultText');
            const game = <any>{status: {currentRound: 2, status: 'pending'}};
            component.currentRound = 1;
            component.checkFinalActions(game);
            return (expect(component.getRoundResultText) as any).to.have.been.called
                && (expect(component.getGameResultText) as any).to.not.have.been.called;
        });

        it('should call component.getRoundResultText and component.getGameResultText if round change and if end game', () => {
            stub(component, 'getRoundResultText');
            stub(component, 'getGameResultText');
            const game = <any>{status: {currentRound: 2, status: 'ended'}};
            component.currentRound = 1;
            component.checkFinalActions(game);
            return (expect(component.getRoundResultText) as any).to.have.been.called
                && (expect(component.getGameResultText) as any).to.have.been.called;
        });
    });

    describe('getRoundResultText', () => {
        it('should return correct string when winner is draw', () => {
            component.currentRound = 1;
            return (expect(component.getRoundResultText(<any>{rounds: [{winner: 'draw'}]})) as any).to.be.deep.eq(`That's a draw !`);
        });

        it('should  return correct string when winner is creator', () => {
            component.currentRound = 1;
            return (expect(component.getRoundResultText(<any>{rounds: [{winner: 'creator'}]})) as any).to.be.deep.eq(`You win !`);
        });

        it('should  return correct string when winner is opponent', () => {
            component.currentRound = 1;
            return (expect(component.getRoundResultText(<any>{rounds: [{winner: 'opponent'}]})) as any).to.be.deep.eq(`You lose !`);
        });
    });

    describe('getGameResultText', () => {
        it('should return correct string when winner is draw', () => {
            component.currentRound = 1;
            return (expect(component.getGameResultText(<any>{status: {winner: 'draw'}})) as any).to.be.deep.eq(`You're as strong as your opponent, that's a draw !`);
        });

        it('should  return correct string when winner is creator', () => {
            component.currentRound = 1;
            return (expect(component.getGameResultText(<any>{status: {winner: 'creator'}})) as any).to.be.deep.eq(`Congratulations, you won this match !`);
        });

        it('should  return correct string when winner is opponent', () => {
            component.currentRound = 1;
            return (expect(component.getGameResultText(<any>{status: {winner: 'opponent'}})) as any).to.be.deep.eq(`Oh no, you lose the match !`);
        });
    });

    describe('goToNextRound', () => {
        it('should call component.initGame', () => {
            stub(component, 'initGame');
            component.goToNextRound();
            return (expect(component.initGame) as any).to.have.been.called;
        });
    });

    describe('goToGames', () => {
        it('should call router.navigate with correct param', () => {
            stub(router, 'navigate');
            component.goToGames();
            return (expect(router.navigate) as any).to.have.been.calledWith(['/main/home']);
        });
    });
});
