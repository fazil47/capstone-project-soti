import { Component } from '@angular/core';
import { LoginService } from '../shared/services/login.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
 constructor(public loginServ:LoginService){}
}
