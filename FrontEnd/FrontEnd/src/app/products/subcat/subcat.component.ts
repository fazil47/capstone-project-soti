import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/shared/models/product.model';
import { ProductCategoryService } from 'src/app/shared/services/product-category.service';
import { ProductService } from 'src/app/shared/services/product.service';

@Component({
  selector: 'app-subcat',
  templateUrl: './subcat.component.html',
  styleUrls: ['./subcat.component.css'],
})
export class SubcatComponent implements OnInit {
  catIdNum: number = 101;
  constructor(
    public pD: ProductCategoryService,
    public serv: ProductService,
    public objHttp: HttpClient
  ) {}
  ngOnInit(): void {
    this.pD.refreshProductCategoryList();
    //console.log(this.pD.pCategory);
  }

  logCategoryId(categoryId: number) {
    this.catIdNum = categoryId;
    console.log(categoryId);
  }
  refreshProductList(id:number)
  {
    this.pD.clickedId = id;
    this.serv.refreshProductList();
  }

  refreshProductCategoryList(categoryId: number) {
    this.pD.clickedId = categoryId
    this.pD.refreshProductsByCategory(categoryId);
  }
}
