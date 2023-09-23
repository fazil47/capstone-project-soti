import { Injectable } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthenticatedResponse } from '../models/authenticated-response.model';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Login } from '../models/login.model';
import { LoginService } from './login.service';
import { User } from '../models/user.model';


@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private router: Router, private jwtHelper: JwtHelperService,private http: HttpClient,private loginserv:LoginService){}

  register(form:NgForm,user:User)
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
        error: (err: HttpErrorResponse) =>{ 
          this.loginserv.invalidLogin = true;
          var age = user.createdDate.getFullYear() - new Date(user.dateOfBirth).getFullYear();
          var m = user.createdDate.getMonth() - new Date(user.dateOfBirth).getMonth();
          if (m < 0 || (m === 0 && new Date(user.dateOfBirth).getDate() < new Date(user.dateOfBirth).getDate())) {
                 age--;
              }
              if(age<18){
                alert("Age is less than 18....")
              }
        }
      })
  }

}
