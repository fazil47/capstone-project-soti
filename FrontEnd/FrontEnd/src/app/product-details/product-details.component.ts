import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../shared/models/product.model';
import { ProductService } from '../shared/services/product.service';
import { Observable } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { CartService } from '../shared/services/cart.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent implements OnInit {
  product?: Product;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    // First get the product id from the current route.
    const routeParams = this.route.snapshot.paramMap;
    const productIdFromRoute = Number(routeParams.get('productId'));

    this.productService
      .getProductById(productIdFromRoute)
      .then((response) => (this.product = response as Product))
      .catch((err: HttpErrorResponse) => console.log(err));
  }

  addToCart() {
    this.cartService.addProductToCart(this.product);
  }

  removeFromCart() {
    this.cartService.removeFromCart(this.product);
  }

  isProductInCart(): boolean {
    return this.cartService.isProductInClass(this.product);
  }
}
