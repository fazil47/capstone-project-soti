import { Component,OnInit } from '@angular/core';
import { Category } from 'src/app/shared/models/category.model';
import { ToastrService } from 'ngx-toastr';
import { HttpHeaders,HttpClient,HttpErrorResponse } from '@angular/common/http';
import { ProductCategoryService } from 'src/app/shared/services/product-category.service';
import { NgForm } from '@angular/forms';
import { EditCategoryService } from 'src/app/shared/services/edit-category.service';


@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.css']
})
export class EditCategoryComponent implements OnInit{

  constructor(public http:HttpClient,private toastr: ToastrService,public serv:ProductCategoryService,public cedit:EditCategoryService){}


  ngOnInit(): void {
    this.serv.refreshProductCategoryList();
    this.resetForm()
  }

  resetForm(form?:NgForm){
    if(form!=null)
    {
      form.form.reset();
    }
    else
    {
      this.cedit.CData = {id:0,categoryName:"",products:[]}
    }
  }

  onSubmit(form:NgForm)
  {
    
    if(this.cedit.CData.id==0)
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
    this.cedit.insertRecord()
    .subscribe({
      next: (response) => {
        this.toastr.success('Insertion', 'Insertion Success');
        this.resetForm(form);
        this.serv.refreshProductCategoryList();
       

      },
      error: (err: HttpErrorResponse) => {
        this.toastr.error('Insertion', 'Insertion Failed');
        console.log("Insertion failed" +err)}})
  }
  updateRecord(form:NgForm)
  {
    this.cedit.updateRecord()
    .subscribe({
      next: (response) => {
        this.toastr.info('Updation', 'Updation Success');
        this.resetForm(form);
        this.cedit.CData.id = 0;
        this.serv.refreshProductCategoryList();
        
      },
      error: (err: HttpErrorResponse) => {
        this.toastr.error('Updation', 'Updation Failed');
        console.log("Updation failed" +err)}})
      
    }

  delCategory(id:number)
  {
    if(confirm("Are you sure you want to delete?")){

      this.cedit.delCategory(id)
    .subscribe({
      next: (response) => {
        this.toastr.success('Deletion', 'Deletion Success');
        this.serv.refreshProductCategoryList();
        this.resetForm();
      },
      error: (err: HttpErrorResponse) => {
        this.toastr.error('Deletion', 'Deletion Failed');
        console.log("Deletion failed" +err)}})
      
    }
  }
  fillForm(selectedP:Category)
  {
    this.cedit.CData = Object.assign({},selectedP);
  }
}
