import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataServiceService {

  constructor(private http :HttpClient) { }

  getAllUsers(){
    return this.http.get<any>('https://jsonplaceholder.typicode.com/users')
  }


  updateUser(id:number,updatedBody:any){
    return this.http.put("/api/users/"+id,updatedBody)
  }
}
