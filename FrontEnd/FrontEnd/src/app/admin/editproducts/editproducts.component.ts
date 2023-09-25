import { HttpHeaders,HttpClient,HttpErrorResponse } from '@angular/common/http';
import { Component,OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Product } from 'src/app/shared/models/product.model';
import { ProductService } from 'src/app/shared/services/product.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-editproducts',
  templateUrl: './editproducts.component.html',
  styleUrls: ['./editproducts.component.css']
})
export class EditproductsComponent implements OnInit{

  PData : Product = new Product();

  constructor(public serv:ProductService,public http:HttpClient,private toastr: ToastrService){}

  ngOnInit(): void {
    this.serv.refreshProductList();
    this.resetForm();
  }


  resetForm(form?:NgForm){
    if(form!=null)
    {
      form.form.reset();
    }
    else
    {
      this.PData = {id:0,productName:"",productDescription:"",discontinued:false,category:null,modifiedDate:new Date(),createdDate:new Date()}
    }
  }

  onSubmit(form:NgForm)
  {
    if(this.PData.id==0)
    {
      this.insertRecord(form);
    }
    else
    {
      this.updateRecord(form);
    }
  }

  insertRecord(form:NgForm)
  {
    this.PData.createdDate = new Date();

    console.log("insert"+this.PData);
    this.http
    .post(
      'http://localhost:5001/api/products/edit',
      this.PData,
      {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      }
    )
    .subscribe({
      next: (response) => {
        this.toastr.success('Insertion', 'Insertion Success');
        this.serv.refreshProductList();
        this.resetForm(form);

      },
      error: (err: HttpErrorResponse) => {
        this.toastr.error('Insertion', 'Insertion Failed');
        console.log("Insertion failed" +err)}})
     
  
  }
  updateRecord(form:NgForm)
  {
    this.PData.createdDate = new Date(this.PData.createdDate);
    this.http
    .put(
      'http://localhost:5001/api/products/edit/'+this.PData.id,
      this.PData,
      {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      }
    )
    .subscribe({
      next: (response) => {
        this.toastr.info('Updation', 'Updation Success');
        this.resetForm(form);
        this.PData = {id:0,modifiedDate:new Date(),createdDate:new Date(),discontinued:false};
        this.serv.refreshProductList();
      },
      error: (err: HttpErrorResponse) => {
        this.toastr.error('Updation', 'Updation Failed');
        console.log("Updation failed" +err)}})
      
    }

  delProduct(id:number)
  {
    if(confirm("Are you sure you want to delete?")){

      this.http
    .delete(
      'http://localhost:5001/api/products/edit/'+id,
    )
    .subscribe({
      next: (response) => {
        this.toastr.success('Deletion', 'Deletion Success');
        this.serv.refreshProductList();
        this.resetForm();
        
      },
      error: (err: HttpErrorResponse) => {
        this.toastr.error('Deletion', 'Deletion Failed');
        console.log("Deletion failed" +err)}})
      
    }
  }
  fillForm(selectedP:Product)
  {
    this.PData = Object.assign({},selectedP);
  }
}
