import { Component, OnInit } from '@angular/core';
import { GameService } from '../../services/game.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  balance: any;

  constructor(private gameService: GameService) { }

  ngOnInit() {
    this.gameService.getBalance()
      .subscribe((balance) => {
        this.balance = balance;
      })
  }

}
