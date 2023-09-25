import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../shared/models/product.model';
import { ProductService } from '../shared/services/product.service';
import { Observable } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent implements OnInit {
  product?: Product;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    // First get the product id from the current route.
    const routeParams = this.route.snapshot.paramMap;
    const productIdFromRoute = Number(routeParams.get('productId'));

    this.productService.getProductById(productIdFromRoute).subscribe({
      next: (response) => (this.product = response as Product),
      error: (err: HttpErrorResponse) => console.log(err),
    });
  }

  addToCart() {
    alert('Not implemented yet');
  }
}
