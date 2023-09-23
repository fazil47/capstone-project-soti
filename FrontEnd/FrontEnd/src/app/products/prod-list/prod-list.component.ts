import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ProductCategory } from 'src/app/shared/models/product-category';
import { ProductCategoryService } from 'src/app/shared/services/product-category.service';
import { ProductService } from 'src/app/shared/services/product.service';



@Component({
  selector: 'app-prod-list',
  templateUrl: './prod-list.component.html',
  styleUrls: ['./prod-list.component.css'],
})
export class ProdListComponent implements OnInit {
  constructor(public serv: ProductService,public pd:ProductCategoryService) {}

  ngOnInit(): void {
    this.serv.refreshProductList();
    this.pd.refreshProductCategoryList();
    console.log(this.pd.pCategory); 
  }
}
