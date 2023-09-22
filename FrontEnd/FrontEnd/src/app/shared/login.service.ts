import { Injectable } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthenticatedResponse } from '../models/authenticated-response.model';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Login } from '../models/login.model';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  name:string;
  invalidLogin: boolean;
  
  constructor(private router: Router, private jwtHelper: JwtHelperService,private http: HttpClient){}

  login(form:NgForm,credentials)
  {
      this.http.post<AuthenticatedResponse>("http://localhost:5001/api/user/login", credentials, {
        headers: new HttpHeaders({ "Content-Type": "application/json"})
      })
      .subscribe({
        next: (response:AuthenticatedResponse) => {
          const token = response.token;
          console.log(token);
          this.name = response.name;
          
          console.log(this.name);
          localStorage.setItem('jwt',token);
          localStorage.setItem('currentUser', JSON.stringify({ token: token, name: this.name }))

          this.invalidLogin = false; 
          this.router.navigate(["/login"]);
        },
        error: (err: HttpErrorResponse) => this.invalidLogin = true
      })
  }
  isUserAuthenticated = (): boolean => {
    if(localStorage.getItem("currentUser")==null)
    {
      return false;
    }
    const token = JSON.parse(localStorage.getItem("currentUser")).token;


    if (token && !this.jwtHelper.isTokenExpired(token)){
      return true;
    }

    return false;
  }

}