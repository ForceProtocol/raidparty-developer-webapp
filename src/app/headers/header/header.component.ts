import { Component, OnInit } from '@angular/core';
import { GameService } from '../../services/game.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  balance: any;

  constructor(private gameService: GameService,
              private auth: AuthService,
              private router: Router) { }

  ngOnInit() {
    this.gameService.getBalance()
      .subscribe((balance) => {
        this.balance = balance;
      })
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }

}
