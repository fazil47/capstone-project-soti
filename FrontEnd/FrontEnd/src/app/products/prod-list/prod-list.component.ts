import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ProductService } from 'src/app/shared/services/product.service';



@Component({
  selector: 'app-prod-list',
  templateUrl: './prod-list.component.html',
  styleUrls: ['./prod-list.component.css'],
})
export class ProdListComponent implements OnInit {
  constructor(public serv: ProductService) {}

  ngOnInit(): void {
    this.serv.refreshProductList();
  }
}
