import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { ProductCategory } from "../models/product-category";
import { JwtHelperService } from "@auth0/angular-jwt";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";


@Injectable({
    providedIn: 'root',
  })
export class ProductCategoryService  {
    readonly apiUrl='http://localhost:5001/api/Categories';
    pCategory:ProductCategory[] =[];

    constructor(
        private objHttp: HttpClient,
        private jwtHelper: JwtHelperService
      ) {}

      refreshProductCategoryList() {
        this.objHttp.get(this.apiUrl)
          .subscribe({
            next: (response) => {
              // Clear the existing data in the array
              this.pCategory.length = 0;
              // Push the fetched data into the array
              Array.prototype.push.apply(this.pCategory, response as ProductCategory[]);
            },
            error: (err: HttpErrorResponse) => console.log(err)
          });
      }

}
