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

    this.gameService.getAllPendingGames()
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

  /**
   * Returns full text of a given game mode
   *
   * @param {string} mode
   * @returns {string}
   * @memberof HomeComponent
   */
  displayGameMode(mode: string): string {
    return GAME.MODE[mode.toUpperCase()].TEXT;
  }
  /**
   * Returns label of a given game opponent
   *
   * @param {string} opponent
   * @returns {string}
   * @memberof HomeComponent
   */
  displayGameOpponent(opponent: string): string {
    return GAME.OPPONENT[opponent.toUpperCase()];
  }

  /**
   * Returns name of the creator, 'me' if requester is the creator, creatorUsername otherwise
   *
   * @param {number} creator
   * @param {string} creatorUsername
   * @returns {string}
   * @memberof HomeComponent
   */
  displayGameCreator(creator: number, creatorUsername: string): string {
    return this.connectedUser.username === creatorUsername ? 'me' : creatorUsername;
  }

  /**
   * Navigates to the given game page
   *
   * @param {GameModel} game
   * @memberof HomeComponent
   */
  joinGame(game: GameModel): void {
    this.router.navigate([`/main/game/${game._id}`]);
  }
}
