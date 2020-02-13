import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-patient',
  templateUrl: './add-patient.component.html',
  styleUrls: ['./add-patient.component.css']
})
export class AddPatientComponent implements OnInit {

  private user = {
    rut: '',
    age: 0,
    firstName: '',
    middleName: '',
    lastName: '',
    middleLastName: '',
    phone: '',
    email: '',
    gender: '',
    specialization: '',
    typeUser_fk: ''
  }

  displayModalDiagnostic = 'none';
  constructor() { }

  ngOnInit() {
    this.displayModalDiagnostic = 'none';
  }

  onSubmit() {
    this.displayModalDiagnostic = 'block';
    console.log('ok');
  }

  closeDiagnostic() {
    this.displayModalDiagnostic = 'none';
  }
}
