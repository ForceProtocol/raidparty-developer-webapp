import { Component, OnInit } from '@angular/core';
import { GameService } from '../../services/game.service';
import { Router } from '@angular/router'
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-games-list',
  templateUrl: './games-list.component.html',
  styleUrls: ['./games-list.component.css']
})
export class GamesListComponent implements OnInit {
  games: any = [];
  isCollapsed: boolean = true;


  constructor(private gameService: GameService,
              private router: Router,
              private toaster: ToastrService) {
    this.getGames();
  }

  ngOnInit() {
  }

  getGames() {
    this.gameService.getGames()
      .subscribe((games) => {
        this.games = games.map((game) => {game.isCollapsed = this.isCollapsed; return game});
        if (this.games.length == 0) {
          this.router.navigate(['/games/empty'])
        }
      },
      (error) => {
        this.toaster.error('Error', error.message, {
          timeOut: 3000,
          positionClass: 'toast-bottom-center'
        });
      })
  }

  delete(gameId, title) {
    this.gameService.delete(gameId, title)
      .subscribe((response) => {
        let index = this.games.indexOf()
        this.games = this.games.filter((game) => game.gameId !== gameId);
        this.toaster.success('Success', 'The game is deleted successfully', {
          timeOut: 3000,
          positionClass: 'toast-top-right'
        });
      },
      (error) => {
        this.toaster.error('Error', error.message, {
          timeOut: 3000,
          positionClass: 'toast-bottom-center'
        });
      })
  }

}
