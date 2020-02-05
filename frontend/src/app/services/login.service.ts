import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private URI = 'http://localhost:3000/api/';
  constructor(
    private http: HttpClient
  ) { }

  signup(login) {
    return this.http.post<any>(this.URI+'/logins/signup', login);
  }

  login(login){
    return this.http.post<any>(this.URI+'/logins/signin', login);
  }
}
