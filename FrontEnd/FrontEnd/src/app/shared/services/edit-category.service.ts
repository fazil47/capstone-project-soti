import { Injectable } from '@angular/core';
import { Category } from '../models/category.model';
import { HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EditCategoryService {

  CData:Category=new Category();

  readonly apiUrl = 'http://localhost:5001/api/categories/edit';

  constructor(public http:HttpClient){}

  insertRecord()
  {
    return  this.http.post(this.apiUrl,this.CData);
  }
 

  updateRecord()
  {
    return this.http.put(this.apiUrl+'/'+this.CData.id,this.CData);
  }

  delCategory(id:number)
  {
    return this.http.delete(this.apiUrl+'/'+id);
  }

  
}
