import { Component, OnInit } from '@angular/core';

import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'RaidParty Developer App';
  isLoggedIn: boolean = false;

  constructor(private auth: AuthService) { }

  ngOnInit() {
    this.isLoggedIn = this.auth.isLoggedIn;
  }
}
