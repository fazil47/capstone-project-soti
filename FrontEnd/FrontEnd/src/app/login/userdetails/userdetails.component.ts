import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UserDetailService } from 'src/app/shared/services/userDetails.service';

@Component({
  selector: 'app-userdetails',
  templateUrl: './userdetails.component.html',
  styleUrls: ['./userdetails.component.css']
})
export class UserdetailsComponent implements OnInit{


  constructor(private http: HttpClient,public details:UserDetailService){}
  ngOnInit(): void {
    this.details.getEmail();
    this.details.getDetailsFromEmail();
    console.log(this.details.userDetails);
   // console.log('fetched eamil'+this.email);
  }
 
  

  
  
  


}
