import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment' ;
import { CanActivate }    from '@angular/router';
import { Router } from '@angular/router';

import 'rxjs/add/operator/map'

@Injectable()
export class AuthService implements CanActivate {
  isLoggedIn = false;
  developer: any;
  private token: any;

  constructor(private http: HttpClient,
              private router: Router) {
    let dev = localStorage.getItem("developer");
    if(dev) {
      this.developer = JSON.parse(dev);
      this.token = localStorage.getItem("token");
      this.isLoggedIn = true;
    }
  }

  canActivate() {
    if (!this.isLoggedIn) {
      this.router.navigate(["/login"]);
      return false;
    } else {
      return true;
    }
  }

  signup(params) {
    return this.http.post(`${environment.API_HOST}/app/developer`, params)
      .map((response) => {
        return response;
      })
  }

  login(params) {
    return this.http.post(`${environment.API_HOST}/app/developer/login`, params)
      .map((response) => {
        this.isLoggedIn = true;
        this.setLocalStorage(response);
        return response;
      })
  }

  resetPassword(params) {
    return this.http.post(`${environment.API_HOST}/app/developer/reset-password`, params)
  }

  changePassword(params, developerId, pin) {
    return this.http.post(`${environment.API_HOST}/app/developer/change-password?developer=${developerId}&pin=${pin}`, params)
      .map((response: any) => {
        return response;
      })
  }

  activateDevloper(developerId, pin) {
    return this.http.get(`${environment.API_HOST}/app/developer/activate?developer=${developerId}&pin=${pin}`)
      .map((response: any) => {
        return response;
      })
  }

  getToken() {
    return this.token;
  }

  private setLocalStorage(response) {
    this.developer = response.developer;
    this.token = response.token;
    localStorage.setItem("developer", JSON.stringify(response.developer));
    localStorage.setItem("token", response.token);
  }

}