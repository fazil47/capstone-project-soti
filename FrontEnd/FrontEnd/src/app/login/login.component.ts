import { Component } from '@angular/core';
import { Login } from '../models/login.model';
import { NgForm } from '@angular/forms';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthenticatedResponse } from '../models/authenticated-response.model';
import { JwtHelperService } from '@auth0/angular-jwt';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  credentials: Login = {emailid:'', password:''};
  invalidLogin: boolean;

  constructor(private router: Router, private jwtHelper: JwtHelperService,private http: HttpClient){}

  login(form:NgForm)
  {
    if (form.valid) {
      this.http.post<AuthenticatedResponse>("http://localhost:5204/api/user/login", this.credentials, {
        headers: new HttpHeaders({ "Content-Type": "application/json"})
      })
      .subscribe({
        next: (response: AuthenticatedResponse) => {
          const token = response.token;
          localStorage.setItem("jwt", token); 
          this.invalidLogin = false; 
          this.router.navigate(["/login"]);
        },
        error: (err: HttpErrorResponse) => this.invalidLogin = true
      })
    }
  }

  isUserAuthenticated = (): boolean => {
    const token = localStorage.getItem("jwt");

    if (token && !this.jwtHelper.isTokenExpired(token)){
      return true;
    }

    return false;
  }

  logOut = () => {
    localStorage.removeItem("jwt");
  }

}
