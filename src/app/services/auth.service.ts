import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment' ;
import { CanActivate }    from '@angular/router';
import { Router } from '@angular/router';

import 'rxjs/add/operator/map'

@Injectable()
export class AuthService implements CanActivate {
  isLoggedIn = false;

  constructor(private http: HttpClient,
              private router: Router) { }

  canActivate() {
    if (!this.isLoggedIn) {
      this.router.navigate(["/login"]);
      return false;
    }
  }

  signup(params) {
    return this.http.post(`${environment.API_HOST}/developer/signup`, params)
  }

  login(params) {
    return this.http.post(`${environment.API_HOST}/developer/login`, params)
      .map((response) => {
        this.isLoggedIn = true;
        return response;
      })
  }

  resetPassword(params) {
    return this.http.post(`${environment.API_HOST}/developer/reset-password`, params)
  }
}