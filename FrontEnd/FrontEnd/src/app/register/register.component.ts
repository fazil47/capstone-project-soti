import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from '../shared/models/user.model';
import { RegisterService } from '../shared/services/register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  constructor(public serv: RegisterService) {}
  user: User = new User();
  register(form: NgForm) {
    this.user.createdDate = new Date();
    console.log(this.user);
    this.serv.register(form, this.user);
  }
}
