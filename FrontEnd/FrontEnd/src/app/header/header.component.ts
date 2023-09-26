import { Component } from '@angular/core';
import { LoginService } from '../shared/services/login.service';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import { ProductService } from '../shared/services/product.service';
import { ProductCategoryService } from '../shared/services/product-category.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  constructor(public loginServ: LoginService,public prodServ:ProductService,public catServ:ProductCategoryService) {}

  logOut(): void {
    Swal.fire({
      title: 'Do you want to logout?',
      text: 'Hi ' + this.loginServ.name + ', do you really want to log out :(',
      showDenyButton: true,
      confirmButtonText: 'Yes',
      denyButtonText: `No`,

      icon: 'warning',
      centre: true,
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire('Logged Out', 'Logged out successfully', 'success');
        this.loginServ.logout();
      } else if (result.isDenied) {
        Swal.fire('Continue as ' + this.loginServ.name, '', 'info');
      }
    });
  }

  refreshProductList()
  {
    this.catServ.clickedId = 1;
    console.log(this.catServ.clickedId);

    this.prodServ.refreshProductList()

  }
}
