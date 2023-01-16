import { ChangeDetectorRef } from '@angular/core';
import { expect } from 'chai';
import { HomeComponent } from './home.component';
import { Router } from '@angular/router';
import { stub, stubClass } from '../../../../../../test';
import { GameService } from '../../../../../services/game/game.service';
import { ApiAuthService } from '../../../../..//services/auth/auth.service';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let router: Router;
  let gameService: GameService;
  let apiAuthService: ApiAuthService;
  // tslint:disable-next-line:prefer-const
  let cdRef: ChangeDetectorRef;

  beforeEach(() => {
    component = new HomeComponent(
      router = stubClass(Router),
      cdRef,
      gameService = stubClass(GameService),
      apiAuthService = stubClass(ApiAuthService)
    );
  });

  it('should init the component', () => {
    return expect(component).to.not.be.undefined;
  });

  describe('startGame', () => {
    it('should call gameService.initNextGame with correct params', () => {
      stub(gameService, 'initNextGame');
      component.roundNumber = 10;
      component.mode = 'classic';
      component.opponent = 'computer';
      component.startGame();
      return (expect(gameService.initNextGame) as any).to.have.been.calledWith({roundNumber: 10, mode: 'classic', opponent: 'computer'});
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
      component.connectedUser = {username: 'Morgan'};
      return (expect(component.displayGameCreator(1, 'Morgan')) as any).to.be.deep.eq('me');
    });

    it('should return user\'s username if connectedUser is not same as creator', () => {
      component.connectedUser = {username: 'Toto'};
      return (expect(component.displayGameCreator(1, 'Morgan')) as any).to.be.deep.eq('Morgan');
    });
  });

  describe('joinGame', () => {
    it('should call router.navigate with correct url', () => {
      stub(router, 'navigate');
      component.joinGame(<any>{_id: 'toto'});
      return (expect(router.navigate) as any).to.have.been.calledWith(['/main/game/toto']);
    });
  });
});
