import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as jwt_decode from 'jwt-decode';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  URI = 'http://localhost:3000/api/'
  constructor(
    private http: HttpClient,
    private loginService: LoginService
  ) { }

  create(user) {
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

  
}
