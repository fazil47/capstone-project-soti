import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthenticatedResponse } from '../models/authenticated-response.model';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Login } from '../models/login.model';
import { concatWith } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  // this.http.get("http://localhost:5001/api/products",  {
  //   headers: new HttpHeaders({ "Content-Type": "application/json","Authorization":`Bearer ${localStorage.getItem('jwt')}`})
  // })
  constructor(private router: Router, private jwtHelper: JwtHelperService,private http: HttpClient){}

  fetchProducts()
  {
    
      this.http.get("http://localhost:5001/api/products")
      .subscribe({
        next: (response) => {
          console.log(response);
          
        },
        error: (err: HttpErrorResponse) => console.log(JSON.parse(localStorage.getItem("currentUser")).token)
      })
  }
}
