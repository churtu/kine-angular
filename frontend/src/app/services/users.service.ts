import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as jwt_decode from 'jwt-decode';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  URI = 'http://localhost:3000/api/';
  constructor(
    private http: HttpClient
  ) { }

  addUser(user) {
    return this.http.post<any>(this.URI + 'users', user);
  }

  getAllUsers(){
    return this.http.get<any>(`${this.URI}users`);
  }

  getUserById(id) {
    return this.http.get<any>(`${this.URI}users/${id}`);
  }

  getUserByLoginId(id){
    return this.http.get<any>(`${this.URI}users/byLoginId/${id}`);
  }

  getSpecializations(){
    return this.http.get<any>(`${this.URI}specializations`);
  }

  addKine_data(data){
    return this.http.post<any>(`${this.URI}kine-data`,data);
  }
  
  getKineDataByUserId(id){
    return this.http.get<any>(`${this.URI}kine-data/byUserId/${id}`);
  }

  getAllKines(){
    return this.http.get<any>(`${this.URI}kine-data`);
  }
}
