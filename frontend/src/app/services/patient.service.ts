import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  private URL: 'http://localhost:3000/api/';
  constructor(
    private http: HttpClient
  ) { }

  getAll(){
    return this.http.get<any>(this.URL+'patient');
  }
}
