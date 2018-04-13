import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from '../auth/login/login.component';
import { SignupComponent } from '../auth/signup/signup.component';
import { ForgotPasswordComponent } from '../auth/forgot-password/forgot-password.component';
import { HomeComponent } from '../home/home.component';
import { AuthService } from '../services/auth.service';
import { GamesListComponent } from '../game/games-list/games-list.component';
import { AddGameComponent } from '../game/add-game/add-game.component';
import { NoGamesComponent } from '../game/no-games/no-games.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'home', component: HomeComponent, canActivate: [AuthService] },
  { path: 'games/list', component: GamesListComponent, canActivate: [AuthService] },
  { path: 'games/add', component: AddGameComponent, canActivate: [AuthService] },
  { path: 'games/:gameId/edit', component: AddGameComponent, canActivate: [AuthService] },
  { path: 'games/empty', component: NoGamesComponent, canActivate: [AuthService] },
  { path: '**', component: LoginComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  declarations: [],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
