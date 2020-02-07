import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TypeUserService {
  
  private URI = 'http://localhost:3000/api/'
  constructor(
    private http: HttpClient
  ) { }

  getAll(){
    return this.http.get<any>(this.URI+'type-user');
  }

  getByDesc(desc:string){
    return this.http.get<any>(this.URI+'type-user/desc/'+desc);
  }
}
