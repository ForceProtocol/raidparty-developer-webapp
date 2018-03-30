import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment' ;



@Injectable()
export class AuthService {

  constructor(private http: HttpClient) { }

  signup(params) {
    return this.http.post(`${environment.API_HOST}/developer/signup`, params)
  }

  login(params) {
    return this.http.post(`${environment.API_HOST}/developer/login`, params)
  }

  resetPassword(params) {
    return this.http.post(`${environment.API_HOST}/developer/reset-password`, params)
  }
}