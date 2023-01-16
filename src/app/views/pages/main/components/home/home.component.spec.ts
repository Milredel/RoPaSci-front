import { ChangeDetectorRef } from '@angular/core';
import { expect } from 'chai';
import { HomeComponent } from './home.component';
import { Router } from '@angular/router';
import { stubClass } from '../../../../../../test';
import { GameService } from '../../../../../services/game/game.service';
import { ApiAuthService } from '../../../../..//services/auth/auth.service';

describe('LayoutComponent', () => {
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
});
