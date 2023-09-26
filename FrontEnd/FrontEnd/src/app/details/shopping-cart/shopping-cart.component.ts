import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/shared/models/product.model';
import { CartService } from 'src/app/shared/services/cart.service';

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
    this.cartService.removeFromCart(product);
  }
  getTotalPrice():number{
    return this.price
  }
  emptyCart(){
    this.cartService.clearCart();
    this.price=0;
    this.cartService.loadCart();
    
  }
}
