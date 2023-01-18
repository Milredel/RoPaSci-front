import { GameModel } from 'src/app/models/game.model';
import { Component, OnInit, ViewChild } from '@angular/core';
import { GameService } from 'src/app/services/game/game.service';
import { MdbTablePaginationComponent, MdbTableDirective } from 'angular-bootstrap-md';
import { JwtDecoded } from 'src/app/interfaces/JwtDecoded.interface';
import { ApiAuthService } from 'src/app/services/auth/auth.service';
import { GAME } from '../../../../../constants';

@Component({
    selector: 'app-stats',
    templateUrl: './stats.component.html',
    styleUrls: ['./stats.component.scss']
})
export class StatsComponent implements OnInit {
    @ViewChild(MdbTablePaginationComponent, {static: true}) mdbTablePagination: MdbTablePaginationComponent;
    @ViewChild(MdbTableDirective, {static: true}) mdbTable: MdbTableDirective;
    elements: GameModel[] = [];
    previous: GameModel[] = [];
    searchText: string = '';
    headElements = ['Creator', 'Opponent', 'Mode', 'Winner', 'Score'];
    connectedUser;
    stats;

    constructor(
        private gameService: GameService,
        private apiAuthService: ApiAuthService) {
    }

    ngOnInit(): void {
        const decoded: JwtDecoded = this.apiAuthService.getJwtTokenDecoded();
        this.connectedUser = decoded;

        this.gameService.getEndedGames(0, 5)
            .then(data => {
                this.elements = data;
                this.mdbTable.setDataSource(this.elements);

                this.elements = this.mdbTable.getDataSource();
                this.previous = this.mdbTable.getDataSource();
            });

        this.gameService.getStats()
            .then(data => {
                this.stats = data;
            });
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
     * Returns full text of a given game mode
     *
     * @param {string} mode
     * @returns {string}
     * @memberof HomeComponent
     */
    displayGameMode(mode: string): string {
        return GAME.MODE[mode.toUpperCase()].TEXT;
    }
}
