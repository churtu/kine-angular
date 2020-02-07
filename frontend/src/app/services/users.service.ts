import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  URI = 'http://localhost:3000/api/'
  constructor(
    private http: HttpClient
  ) { }

  create(user){
    return this.http.post<any>(this.URI+'users',user);
  }
}
