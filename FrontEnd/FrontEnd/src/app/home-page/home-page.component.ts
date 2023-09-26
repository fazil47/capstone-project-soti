import { Component, OnInit } from '@angular/core';
import { ProductCategoryService } from '../shared/services/product-category.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
})
export class HomePageComponent implements OnInit {
  constructor(
    public pD: ProductCategoryService,
  ) {}
  ngOnInit(): void {
    this.pD.refreshProductCategoryList();
  }


}
