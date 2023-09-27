import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/shared/models/product.model';
import { CartService } from 'src/app/shared/services/cart.service';
import { LoginService } from 'src/app/shared/services/login.service';
import Swal from 'sweetalert2/dist/sweetalert2.js'

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css'],
})
export class ShoppingCartComponent implements OnInit {
  constructor(protected cartService: CartService) {}
  price:number=0;
  ngOnInit(): void {
    this.cartService.loadCart();
  this.cartService.products.forEach(p => {
      this.price+=p.unitPrice;
    });
  }
  removeFromCart(product:Product){
    this.price-=product.unitPrice;
    this.cartService.removeFromCart(product);
  }
  getTotalPrice():number{
    return this.price
  }
  buyCart(){
    Swal.fire({
      title: 'proceed with the purchase',
      text: 'Hi ' + this.loginServ.name + ', are you sure you want to proceed with the purchase',
      showDenyButton: true,
      confirmButtonText: 'Yes',
      denyButtonText: `No`,

      icon: 'warning',
      centre: true,
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire('Purchase', 'Successfully completed', 'success');
        this.cartService.clearCart()
        this.price=0;
        this.cartService.loadCart();
      } else if (result.isDenied) {
        Swal.fire('Continue shopping', '', 'info');
      }
    });  
    
  }

 
}
