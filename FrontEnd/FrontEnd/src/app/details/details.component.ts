import { Component, OnInit } from '@angular/core';
import { ProductService } from '../shared/services/product.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
constructor(public products:ProductService){

}
ngOnInit(): void {

  this.products.refreshProductList();
 
}
}
