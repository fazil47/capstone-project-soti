import { Injectable } from '@angular/core';
import { Product } from '../models/product.model';
import { HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EditProductsService {
  PData : Product = new Product();

  readonly apiUrl = "http://localhost:5001/api/products/edit"

  constructor(public http:HttpClient){}

  insertRecord()
  {
    return this.http.post(this.apiUrl,this.PData)
  }
  updateRecord()
  {
    return   this.http.put(this.apiUrl+'/'+this.PData.id,this.PData)
  }

  delProduct(id:number)
  {
   
    return  this.http.delete(this.apiUrl+'/'+id)
    
  }
 
}


