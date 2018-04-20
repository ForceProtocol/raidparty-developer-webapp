import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { ForgotPasswordComponent } from './auth/forgot-password/forgot-password.component';

import { AppRoutingModule } from './app-routing/app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AuthService } from './services/auth.service';
import { GameService } from './services/game.service';
import { AppInterceptor } from './services/app.interceptor';

import { ToastrModule } from 'ngx-toastr';
import { ClipboardModule } from 'ngx-clipboard';


import { GameAddedComponent } from './game/game-added/game-added.component';
import { GamesListComponent } from './game/games-list/games-list.component';
import { AddGameComponent } from './game/add-game/add-game.component';
import { HeaderComponent } from './headers/header/header.component';
import { FooterComponent } from './headers/footer/footer.component';
import { NoGamesComponent } from './game/no-games/no-games.component';
import { PlayersComponent } from './players/players.component';
import { RewardsComponent } from './rewards/rewards.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    ForgotPasswordComponent,
    GameAddedComponent,
    GamesListComponent,
    AddGameComponent,
    HeaderComponent,
    FooterComponent,
    NoGamesComponent,
    PlayersComponent,
    RewardsComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    NgbModule.forRoot(),
    HttpClientModule,
    ToastrModule.forRoot(),
    ClipboardModule
  ],
  providers: [AuthService, GameService,
  { provide: HTTP_INTERCEPTORS, useClass: AppInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
