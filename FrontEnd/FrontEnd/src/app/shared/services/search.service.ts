import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class SearchService {

  data:string="sfk";
  price:number;

  constructor(public http:HttpClient){}


  getProducts()
  {
    return this.http.get('http://localhost:5001/api/products/name/'+this.data+'?price='+this.price)
  }
}
