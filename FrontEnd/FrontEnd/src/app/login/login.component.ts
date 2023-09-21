import { Component,OnInit } from '@angular/core';
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
export class LoginComponent implements OnInit{
  credentials: Login = {emailid:'', password:''};
  invalidLogin: boolean;
  name:string;

  constructor(private router: Router, private jwtHelper: JwtHelperService,private http: HttpClient){}

  login(form:NgForm)
  {
    if (form.valid) {
      this.http.post<AuthenticatedResponse>("http://localhost:5204/api/user/login", this.credentials, {
        headers: new HttpHeaders({ "Content-Type": "application/json"})
      })
      .subscribe({
        next: (response:AuthenticatedResponse) => {
          const token = response.token;
          this.name = response.name;
          
          console.log(this.name);
          localStorage.setItem('currentUser', JSON.stringify({ token: token, name: this.name }))

          this.invalidLogin = false; 
          this.router.navigate(["/login"]);
        },
        error: (err: HttpErrorResponse) => this.invalidLogin = true
      })
    }
  }
  ngOnInit(): void {
    if(localStorage.getItem("currentUser")!=null)
    {
    this.name = JSON.parse(localStorage.getItem("currentUser")).name;
    }
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

  logOut = () => {
    localStorage.removeItem("currentUser");
   

    this.name = "";
  }

}
