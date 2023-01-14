import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MdbTableDirective, MdbTablePaginationComponent } from 'angular-bootstrap-md';
import { GAME } from '../../../../../constants';
import { GameService } from 'src/app/services/game/game.service';
import { GameModel } from 'src/app/models/game.model';
import { ApiAuthService } from 'src/app/services/auth/auth.service';
import { JwtDecoded } from 'src/app/interfaces/JwtDecoded.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterViewInit {
  @ViewChild(MdbTablePaginationComponent, {static: true}) mdbTablePagination: MdbTablePaginationComponent;
  @ViewChild(MdbTableDirective, {static: true}) mdbTable: MdbTableDirective;
  elements: GameModel[] = [];
  previous: GameModel[] = [];
  searchText: string = '';
  headElements = ['Creator', 'Opponent', 'Mode', 'Rounds', 'Actions'];

  roundNumber = 3;
  mode = GAME.MODE.CLASSIC.VALUE;
  opponent = GAME.OPPONENT.COMPUTER;
  MODES = GAME.MODE;
  OPPONENTS = GAME.OPPONENT;
  connectedUser;
  objectKeys = Object.keys;

  constructor(private router: Router,
              private cdRef: ChangeDetectorRef,
              private gameService: GameService,
              private apiAuthService: ApiAuthService) {
  }

  ngOnInit() {
    const decoded: JwtDecoded = this.apiAuthService.getJwtTokenDecoded();
    this.connectedUser = decoded;

    this.gameService.getAllGames()
      .then(data => {
        this.elements = data;
        this.mdbTable.setDataSource(this.elements);

        this.elements = this.mdbTable.getDataSource();
        this.previous = this.mdbTable.getDataSource();
      });
  }

  ngAfterViewInit(): void {
    this.mdbTablePagination.setMaxVisibleItemsNumberTo(5);

    this.mdbTablePagination.calculateFirstItemIndex();
    this.mdbTablePagination.calculateLastItemIndex();

    this.cdRef.detectChanges();
  }

  public startGame(): void {
    this.gameService.initNextGame(<GameModel>{roundNumber: this.roundNumber, mode: this.mode, opponent: this.opponent});
  }

  displayGameMode(mode: string): string {
    return GAME.MODE[mode.toUpperCase()];
  }

  displayGameOpponent(opponent: string): string {
    return GAME.OPPONENT[opponent.toUpperCase()];
  }

  displayGameCreator(creator: number, creatorUsername: string): string {
    return this.connectedUser.username === creatorUsername ? 'me' : creatorUsername;
  }
}
