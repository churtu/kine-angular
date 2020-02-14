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
}
