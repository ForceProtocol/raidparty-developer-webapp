import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GameService } from '../../services/game.service';


@Component({
  selector: 'app-game-added',
  templateUrl: './game-added.component.html',
  styleUrls: ['./game-added.component.css']
})
export class GameAddedComponent implements OnInit {
  game: any = {};
  gameId: any = null;

  constructor(private activatedRoute: ActivatedRoute,
              private gameService: GameService) {
    this.gameId = this.activatedRoute.snapshot.queryParams.gameId;
    this.gameService.getGame(this.gameId)
      .subscribe((game) => {
        this.game = game;
      })
  }

  ngOnInit() {
  }

}
