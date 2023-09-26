import { Injectable } from '@angular/core';
import { NgForm } from '@angular/forms';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthenticatedResponse } from '../models/authenticated-response.model';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Login } from '../models/login.model';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  name: string;
  invalidLogin: boolean;

  constructor(
    private router: Router,
    private jwtHelper: JwtHelperService,
    private http: HttpClient
  ) {}

  login(form: NgForm, credentials) {
    this.http
      .post<AuthenticatedResponse>(
        'http://localhost:5001/api/user/login',
        credentials,
        {
          headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
        }
      )
      .subscribe({
        next: (response: AuthenticatedResponse) => {
          const token = response.token;
          this.name = response.name;

          localStorage.setItem('jwt', token);
          localStorage.setItem(
            'currentUser',
            JSON.stringify({ token: token, name: this.name })
          );

          this.invalidLogin = false;
          this.router.navigate(['/login']);
        },
        error: (err: HttpErrorResponse) => (this.invalidLogin = true),
      });
  }

  isUserAuthenticated = (): boolean => {
    if (localStorage.getItem('currentUser') == null) {
      return false;
    }
    const token = JSON.parse(localStorage.getItem('currentUser')).token;

    if (token && !this.jwtHelper.isTokenExpired(token)) {
      return true;
    }

    localStorage.removeItem('cart');
    return false;
  };

  isAdmin = (): boolean => {
    if (localStorage.getItem('currentUser') == null) {
      return false;
    }
    const token = JSON.parse(localStorage.getItem('currentUser')).token;

    let jwtData = token.split('.')[1];
    let decodedJwtJsonData = window.atob(jwtData);
    let decodedJwtData = JSON.parse(decodedJwtJsonData);

    let isAdmin: Boolean =
      decodedJwtData[
        'http://schemas.microsoft.com/ws/2008/06/identity/claims/role'
      ].includes('Admin');

    if (token && !this.jwtHelper.isTokenExpired(token) && isAdmin) {
      return true;
    }

    return false;
  };

  logout() {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('cart');
    this.name = '';
    this.router.navigate(['/login']);
  }
}
