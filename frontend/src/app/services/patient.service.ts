import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PatientService {
  private URI = 'http://localhost:3000/api/';
  constructor(
    private http: HttpClient
  ) { }


  addPatient_data(patient_data){
    return this.http.post<any>(this.URI+'/patient-data', patient_data);
  }

  getTreatmentsByPatientId(id){
    return this.http.get(this.URI+'patient-data/treatmentByPatientId/'+id);
  }
}
