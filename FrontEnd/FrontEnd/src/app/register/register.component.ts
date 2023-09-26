import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from '../shared/models/user.model';
import { RegisterService } from '../shared/services/register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit{
  constructor(public serv:RegisterService){

  }
  ngOnInit(): void {
    
  }
  
  user:User= new User()
  isAgeValid:boolean = true;

  validateAge(birthDate: Date): void {
    const today = new Date();
    const age = today.getFullYear() - birthDate.getFullYear();

    this.isAgeValid = age>=18;
  }

  
  register(form:NgForm)
  {
    this.user.createdDate = new Date();
    console.log(this.user);

    const birthDate = new Date(this.user.dateOfBirth);
    this.validateAge(birthDate);

    if (!this.isAgeValid) {
      console.error('Age must be greater than 18');
      return;
    }

    this.serv.register(form,this.user);
  }
}
