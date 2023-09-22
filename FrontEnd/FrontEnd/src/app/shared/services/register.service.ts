import { Injectable } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthenticatedResponse } from '../models/authenticated-response.model';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Login } from '../models/login.model';
import { LoginService } from './login.service';


@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private router: Router, private jwtHelper: JwtHelperService,private http: HttpClient,private loginserv:LoginService){}

  register(form:NgForm,user)
  {
      this.http.post<AuthenticatedResponse>("http://localhost:5001/api/user/register", user, {
        headers: new HttpHeaders({ "Content-Type": "application/json"})
      })
      .subscribe({
        next: (response:AuthenticatedResponse) => {
          const token = response.token;
          console.log(token);
          this.loginserv.name = response.name;
          
          console.log(this.loginserv.name);
          localStorage.setItem('jwt',token);
          localStorage.setItem('currentUser', JSON.stringify({ token: token, name: this.loginserv.name }))

          this.loginserv.invalidLogin = false; 
          alert("Registration success");
          this.router.navigate(["/login"]);
        },
        error: (err: HttpErrorResponse) => this.loginserv.invalidLogin = true
      })
  }

}
