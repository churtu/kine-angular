import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AgendaService {

  private URI = 'http://localhost:3000/api/';
  constructor(
    private http: HttpClient
  ) { }

  getAllAgendasByKineId(id:String){
    return this.http.get<any>(`${this.URI}/agenda/kine/${id}`);
  }

  addAgenda(agenda){
    return this.http.post<any>(`${this.URI}/agenda`,agenda);
  }

  getAllAgendasByKineIdAndDate(id:String, date:String){
    return this.http.get<any>(`${this.URI}agenda/kine/${id}/date/${date}`);
  }

  putAgenda(id,agenda){
    return this.http.put<any>(`${this.URI}agenda/${id}`,agenda);
  }

  getAgendaById(id){
    return this.http.get<any>(`${this.URI}agenda/${id}`);
  }

}


