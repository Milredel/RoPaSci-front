import { GameService } from '../../../../../services/game/game.service';
import { ApiAuthService } from '../../../../..//services/auth/auth.service';
import { StatsComponent } from './stats.component';
import { expect, stub, stubClass } from '../../../../../../test';

describe('StatsComponent', () => {
    let component: StatsComponent;
    let gameService: GameService;
    let apiAuthService: ApiAuthService;

    beforeEach(() => {
        component = new StatsComponent(
            gameService = stubClass(GameService),
            apiAuthService = stubClass(ApiAuthService)
        );
    });

    it('should init the component', () => {
        return expect(component).to.not.be.undefined;
    });

    describe('ngOnInit', () => {
        it('should call gameService.getEndedGames', () => {
            stub(gameService, 'getEndedGames').callsFake(() => {
                return {then: () => null};
            });
            stub(gameService, 'getStats').callsFake(() => {
                return {then: () => null};
            });
            component.ngOnInit();
            return (expect(gameService.getEndedGames) as any).to.have.been.called
                && (expect(gameService.getStats) as any).to.have.been.called;
        });
    });

    describe('displayGameMode', () => {
        it('should return correct label', () => {
            return (expect(component.displayGameMode('classic')) as any).to.be.deep.eq('Classic');
        });
    });

    describe('displayGameOpponent', () => {
        it('should return correct label', () => {
            return (expect(component.displayGameOpponent('computer')) as any).to.be.deep.eq('computer');
        });
    });

    describe('displayGameCreator', () => {
        it('should return \'me\' if connectedUser is same as creator', () => {
            component.connectedUser = { username: 'Morgan' };
            return (expect(component.displayGameCreator(1, 'Morgan')) as any).to.be.deep.eq('me');
        });

        it('should return user\'s username if connectedUser is not same as creator', () => {
            component.connectedUser = { username: 'Toto' };
            return (expect(component.displayGameCreator(1, 'Morgan')) as any).to.be.deep.eq('Morgan');
        });
    });
});
