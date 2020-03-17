import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TreatmentService {
  private URI = 'http://localhost:3000/api/';
  constructor(
    private http: HttpClient
  ) { }

  getAllTreatments(){
    return this.http.get<any>(this.URI+'treatments');
  }

  addTreatment(treatment){
    return this.http.post<any>(this.URI+'treatments',treatment);
  }
  
  putTreatment(id, treatment){
    return this.http.put<any>(this.URI+'treatments/'+id,treatment);
  }

}
