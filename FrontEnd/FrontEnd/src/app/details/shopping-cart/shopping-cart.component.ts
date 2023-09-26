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

  ngOnInit(): void {
    this.cartService.loadCart();
    console.log(this.cartService.products);
  }
  removeFromCart(product:Product){
    this.cartService.removeFromCart(product);
  }
}
