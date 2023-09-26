import { Injectable, OnInit } from "@angular/core";
import { userDetails } from "../models/userDetails.model";
import { HttpClient } from "@angular/common/http";

@Injectable({
    providedIn: 'root',
  })
export class UserDetailService implements OnInit{

    emailId:string;

    userDetails: userDetails[] = [];
    constructor(private http: HttpClient){

    }
    ngOnInit(): void {
    }

    setEmail(email:string){
        this.emailId=email;
       
    }

    getEmail(){
        console.log(this.emailId);
       // return this.emailId;
    }

    getDetailsFromEmail() {
        const emailToFind = this.emailId;
        const apiUrl = 'http://localhost:5001/api/user/';
    
        this.http.get(apiUrl).subscribe(
          (data: userDetails[]) => { // Use userDetails array type
            const user = data.find((user) => user.emailId === emailToFind);
    
            if (user) {
              this.userDetails = [user]; // Store the found user in the array
              console.log('User Details:', this.userDetails);
            } else {
              console.log(`User with email ${emailToFind} not found.`);
            }
          },
          (error) => {
            console.error('Error:', error);
          }
        );
      }

    
}