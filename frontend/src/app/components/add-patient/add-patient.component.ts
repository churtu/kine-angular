import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { PatientService } from '../../services/patient.service';

@Component({
  selector: 'app-add-patient',
  templateUrl: './add-patient.component.html',
  styleUrls: ['./add-patient.component.css']
})
export class AddPatientComponent implements OnInit {

  successDisplay = 'none';
  private previtions: String[] = ['Fonasa A', 'Fonsasa B', 'Isapre'];
  private user = {
    rut: '',
    age: null,
    firstName: '',
    middleName: '',
    lastName: '',
    middleLastName: '',
    phone: '',
    email: '',
    address: '',
    gender: '',
    typeUser_fk: '5e3f14e346e320175c47272e'
  }

  private patient_data = {
    prevition: 'aa',
    user_fk: ''
  }

  constructor(
    private usersService: UsersService,
    private patientService: PatientService
  ) { }

  ngOnInit() {
    this.successDisplay = 'none';
  }

  
  onSubmit() {
    this.usersService.addUser(this.user).subscribe(
      res => {
        this.patient_data.user_fk = res._id;
        this.patientService.addPatient_data(this.patient_data).subscribe(
          res => { 
            this.successDisplay = 'block'
          },
          err => console.log(err)
        )
        console.log(res);
      },
      err => console.log(err)
    )
  }

  modal(){
    this.successDisplay = 'block';
  }
  closeSuccess(){
    this.successDisplay = 'none';
  }


}
