import { Component, OnInit } from '@angular/core';
import { ProductCategoryService } from '../shared/services/product-category.service';
import { ProductService } from '../shared/services/product.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
})
export class HomePageComponent implements OnInit {
  constructor(
    public pD: ProductCategoryService,
    private pServe: ProductService
  ) {}

  ngOnInit(): void {
    this.pD.refreshProductCategoryList();
    this.pServe.refreshProductList();
  }

  refreshProductCategoryList(id: number) {
    this.pD.clickedId = id;
    this.pD.refreshProductsByCategory(id);
  }
}
