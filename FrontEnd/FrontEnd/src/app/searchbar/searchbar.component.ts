import { Component,OnInit } from '@angular/core';
import { ProductService } from '../shared/services/product.service';
import { HttpHeaders,HttpClient,HttpErrorResponse } from '@angular/common/http';
import { Product } from '../shared/models/product.model';
import { ProductCategoryService } from '../shared/services/product-category.service';
import { SearchService } from '../shared/services/search.service';


@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.css']
})
export class SearchbarComponent implements OnInit {

 
  constructor(public serv:ProductService,public http:HttpClient,public pc:ProductCategoryService,public srchServ:SearchService){}

  ngOnInit(): void {
   
  }

  onSubmit1()
  {
    this.srchServ.getProducts().subscribe({
      next: (response) => {
        this.serv.PList = response as Product[];
        this.pc.clickedId = 1;
      },
      error: (err: HttpErrorResponse) => 
      { this.serv.PList = []
        console.log(err)},
    });
  }

}
