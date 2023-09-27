import { Injectable, OnInit } from '@angular/core';
import { Product } from '../models/product.model';
import { ProductService } from './product.service';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  products?: Product[];
  productIds?: number[];

  constructor(private productService: ProductService) {}

  loadCart(onSuccess?: () => void): void {
    try {
      this.productIds = JSON.parse(localStorage.getItem('cart'));
      if (this.productIds === undefined || this.productIds === null) {
        this.products = [];
        if (onSuccess) {
          onSuccess();
        }
      } else {
        this.productService
          .getProductsById(this.productIds)
          .then((products) => {
            this.products = products;
            if (onSuccess) {
              onSuccess();
            }
          });
      }
    } catch (error) {
      console.error(error);
    }
  }

  addProductToCart(product: Product) {
    try {
      if (this.products === undefined || this.products === null) {
        this.products = [];
      }
      if (this.productIds === undefined || this.productIds === null) {
        this.productIds = [];
      }
      this.products.push(product);
      this.productIds.push(product.id);
      localStorage.setItem('cart', JSON.stringify(this.productIds));
    } catch (error) {
      console.error(error);
    }
  }

  removeFromCart(product: Product) {
    try {
      if (
        this.products === undefined ||
        this.products === null ||
        this.products.length === 0 ||
        this.productIds === undefined ||
        this.productIds === null ||
        this.productIds.length === 0
      ) {
        alert('Cart Empty, remove operation invalid');
      } else {
        this.products = this.products.filter((p) => p.id !== product.id);
        this.productIds = this.productIds.filter((i) => i !== product.id);
        localStorage.setItem('cart', JSON.stringify(this.productIds));
      }
    } catch (error) {
      console.error(error);
    }
  }

  isProductInClass(product: Product) {
    return this.productIds?.includes(product.id);
  }

  clearCart() {
    localStorage.setItem('cart', JSON.stringify([]));
  }
}
