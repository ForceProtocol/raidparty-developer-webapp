import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { ForgotPasswordComponent } from './auth/forgot-password/forgot-password.component';

import { AppRoutingModule } from './app-routing/app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AuthService } from './services/auth.service';
import { GameService } from './services/game.service';
import { AppInterceptor } from './services/app.interceptor';

import { ToastrModule } from 'ngx-toastr';


import { HomeComponent } from './home/home.component';
import { GamesListComponent } from './game/games-list/games-list.component';
import { AddGameComponent } from './game/add-game/add-game.component';
import { HeaderComponent } from './headers/header/header.component';
import { FooterComponent } from './headers/footer/footer.component';
import { NoGamesComponent } from './game/no-games/no-games.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    ForgotPasswordComponent,
    HomeComponent,
    GamesListComponent,
    AddGameComponent,
    HeaderComponent,
    FooterComponent,
    NoGamesComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    NgbModule.forRoot(),
    HttpClientModule,
    ToastrModule.forRoot()
  ],
  providers: [AuthService, GameService,
  { provide: HTTP_INTERCEPTORS, useClass: AppInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
