import { Component } from '@angular/core';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent {
  num:number=9;
  AddNum(){
    this.num=5;
  }
  DispNum(){
    console.log(this.num);
  }
}
