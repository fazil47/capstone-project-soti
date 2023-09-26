import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Product } from '../models/product.model';
import { firstValueFrom } from 'rxjs';

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

  PList: Product[];

  refreshProductList() {
    this.objHttp.get('http://localhost:5001/api/products').subscribe({
      next: (response) => {
        this.PList = response as Product[];
      },
      error: (err: HttpErrorResponse) => console.log(err),
    });
  }

  async getProductById(productId: number): Promise<Product> {
    return await firstValueFrom(
      this.objHttp.get<Product>(
        `http://localhost:5001/api/products/${productId}`
      )
    );
  }

  async getProductsById(productIds: number[]): Promise<Product[]> {
    return Promise.all(productIds.map((id) => this.getProductById(id)));
  }

  // refreshProductList() {
  //   console.log(`Bearer ${localStorage.getItem('jwt')}`);
  //   const bearerToken = (localStorage.getItem('currentUser') as any).token;

  //   this.objHttp
  //     .get(this.apiURL, {
  //       headers: { Authentication: `Bearer ${bearerToken}` },
  //     })
  //     .toPromise()
  //     .then((res) => {
  //       this.pList = res as Product[];
  //     });
  // }

  // createProduct() {
  //   return this.objHttp.post(this.apiURL, this.pData);
  // }

  // updateProduct() {
  //   return this.objHttp.put(this.apiURL + '/' + this.pData.ID, this.pData);
  // }

  // deleteProduct(id: number) {
  //   return this.objHttp.delete(this.apiURL + '/' + id);
  // }
}
