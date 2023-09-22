import { Component,OnInit } from '@angular/core';
import { Login } from '../models/login.model';
import { LoginService } from '../shared/login.service';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  credentials: Login = {emailid:'', password:''};
  
  constructor(public logServ:LoginService){}

  ngOnInit(): void {
    if(localStorage.getItem("currentUser")!=null)
    {
    this.logServ.name = JSON.parse(localStorage.getItem("currentUser")).name;
    }
  }

  login(form:NgForm)
  {
    if (form.valid) {
      this.logServ.login(form,this.credentials);
    }
  }
  

  
  logOut = () => {
    localStorage.removeItem("currentUser");
    this.logServ.name = "";
  }

}
