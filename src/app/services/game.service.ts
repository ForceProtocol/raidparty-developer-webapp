import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';
import { AuthService } from './auth.service'

import 'rxjs/add/operator/map'

@Injectable()
export class GameService {
  isLoggedIn = false;
  developer: any;
  private token: any;

  constructor(private http: HttpClient,
    private auth: AuthService) { }

  create(game) {

    const formData = new FormData();
    formData.append('title', game.title);
    formData.append('description', game.description);
    let selectedPlatformsArray = game.platforms.filter((pf) => pf.selected);
    let platforms = [];
    selectedPlatformsArray.forEach((pf) => {
      platforms.push({ name: pf.name, link: pf.link });
    });
    formData.append('platform', JSON.stringify(platforms));
    formData.append('activeStatus', 'true');
    formData.append('avatar', game.avatar);

    let headers = new HttpHeaders()
      .set('Content-Type', 'multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW')

    return this.http.post(`${environment.API_HOST}/app/developer/game?token=${this.auth.getToken()}`, formData)
      .map((response: any) => {
        return response.game;
      }, (error) => {
        return error
      });
  }

  update(game, gameId) {
    return this.http.post(`${environment.API_HOST}/app/developer/game/${gameId}?token=${this.auth.getToken()}`, game)
      .map((response: any) => {
        return response.game;
      }, (error) => {
        return error
      });
  }

  delete(gameId, title) {
    let params = new HttpParams().set('title', title);
    return this.http.delete(`${environment.API_HOST}/app/developer/game/${gameId}?token=${this.auth.getToken()}`, { params: params })
      .map((response: any) => {
        return response;
      }, (error) => {
        return error
      });
  }

  getGames() {
    return this.http.get(`${environment.API_HOST}/app/developer/games?token=${this.auth.getToken()}`)
      .map((response: any) => {
        return response.games;
      }, (error) => {
        return error
      });
  }

  getGame(gameId) {
    return this.http.get(`${environment.API_HOST}/app/developer/game/${gameId}?token=${this.auth.getToken()}`)
      .map((response: any) => {
        return response.game;
      }, (error) => {
        return error
      });
  }

  getBalance() {
    return this.http.get(`${environment.API_HOST}/app/developer/balance?token=${this.auth.getToken()}`)
      .map((response: any) => {
        return response.totalForce;
      }, (error) => {
        return error
      });
  }
}