import { Component, OnInit } from '@angular/core';
import { ProductCategoryService } from '../shared/services/product-category.service';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css'],
})
export class CategoryListComponent implements OnInit {
  constructor(public serv: ProductCategoryService) {}

  ngOnInit(): void {
    this.serv.refreshProductCategoryList();
  }
  refreshProductCategoryList(id:number)
  {
    this.serv.clickedId = id;
    this.serv.refreshProductsByCategory(id);
  }
}
