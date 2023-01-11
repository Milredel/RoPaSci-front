import { expect } from 'chai';
import { HomeComponent } from './home.component';
import { Router } from '@angular/router';
import { stubClass } from '../../../../../../test';
import { GameService } from 'src/app/services/game/game.service';

describe('LayoutComponent', () => {
  let component: HomeComponent;
  let router: Router;
  let gameService: GameService;

  beforeEach(() => {
    component = new HomeComponent(
      router = stubClass(Router),
      gameService = stubClass(GameService)
    );
  });

  it('should init the component', () => {
    return expect(component).to.not.be.undefined;
  });
});
