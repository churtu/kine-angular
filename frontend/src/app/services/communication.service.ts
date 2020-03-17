import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommunicationService {

  userName: string ='Nombre de usuario';
  patient_id:string;
  sessions:number;
  agenda_id:string;
  constructor(){}

  setSessions(){
    this.sessions -= 1;
  }
}
