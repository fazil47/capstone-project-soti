import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from './product.model';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  readonly apiURL = 'http://localhost:5001/api/Products';
  public pList?: Product[];
  pData: Product = new Product();

  constructor(
    private objHttp: HttpClient,
    private jwtHelper: JwtHelperService
  ) {}

  refreshProductList() {
    console.log(`Bearer ${localStorage.getItem('jwt')}`);

    this.objHttp
      .get(this.apiURL, {
        headers: { Authentication: `Bearer ${localStorage.getItem('jwt')}` },
      })
      .toPromise()
      .then((res) => {
        this.pList = res as Product[];
      });
  }

  createProduct() {
    return this.objHttp.post(this.apiURL, this.pData);
  }

  updateProduct() {
    return this.objHttp.put(this.apiURL + '/' + this.pData.ID, this.pData);
  }

  deleteProduct(id: number) {
    return this.objHttp.delete(this.apiURL + '/' + id);
  }
}
