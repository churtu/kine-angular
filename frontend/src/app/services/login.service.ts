import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private URI = 'http://localhost:3000/api/';
  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  signup(login) {
    return this.http.post<any>(this.URI + '/logins/signup', login);
  }

  login(login) {
    return this.http.post<any>(this.URI + '/logins/signin', login);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/signin']);
  }

  isLogged(){
    return !!localStorage.getItem('token');
  }
}
