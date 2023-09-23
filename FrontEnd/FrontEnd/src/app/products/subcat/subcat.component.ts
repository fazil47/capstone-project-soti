import { Component, OnInit } from '@angular/core';
import { ProductCategoryService } from 'src/app/shared/services/product-category.service';

@Component({
  selector: 'app-subcat',
  templateUrl: './subcat.component.html',
  styleUrls: ['./subcat.component.css']
})
export class SubcatComponent implements OnInit {
  constructor(public pD:ProductCategoryService){}
  ngOnInit(): void {
    this.pD.refreshProductCategoryList();
    console.log(this.pD.pCategory); 
  }
}
