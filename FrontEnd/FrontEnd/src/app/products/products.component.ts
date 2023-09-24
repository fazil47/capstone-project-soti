import { Component, OnInit } from '@angular/core';
import { ProductCategoryService } from '../shared/services/product-category.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  constructor() {}
  ngOnInit(): void {}
}
