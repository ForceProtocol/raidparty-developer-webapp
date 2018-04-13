import { Component, OnInit } from '@angular/core';
import { Title } from "@angular/platform-browser";

import { AuthService } from './services/auth.service';
import { Router } from '@angular/router'


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private auth: AuthService,
              private router: Router,
              private title: Title) {
    this.router.events.subscribe((event)=>{
      let urlParts = router.url.split("/")
      this.title.setTitle(urlParts[urlParts.length - 1]);
    });
  }

  ngOnInit() { }

  isLoggedIn() {
    return this.auth.isLoggedIn;
  }
}
