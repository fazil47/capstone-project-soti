import { Injectable } from '@angular/core';
import { Category } from './category.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root',
})
export class CategoryListService {
  public cList?: Category[];
  CList: Category[];
  cData: Category = new Category();

  constructor(
    private objHttp: HttpClient,
    private jwtHelper: JwtHelperService
  ) {}

  refreshCategoryList() {
    this.objHttp.get('http://localhost:5204/api/categories').subscribe({
      next: (response) => {
        this.CList = response as Category[];
      },
      error: (err: HttpErrorResponse) => console.log(err),
    });
  }
}
