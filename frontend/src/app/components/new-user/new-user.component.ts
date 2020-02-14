import { Component, OnInit } from '@angular/core';
import { TypeUserService } from '../../services/type-user.service';
import { UsersService } from '../../services/users.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.css']
})
export class NewUserComponent implements OnInit {

  private user = {
    rut: '',
    age: 0,
    firstName: '',
    middleName: '',
    lastName: '',
    middleLastName: '',
    phone: '',
    email: '',
    address: '',
    gender: '',
    specialization: '',
    typeUser_fk: ''
  }

  successDisplay = 'none';
  alertDisplay = 'none'
  errors = [];

  constructor(
    private typeUserService: TypeUserService,
    private usersService: UsersService,
    private router: Router
  ) { }

  ngOnInit() {
    this.successDisplay = 'none';
    this.alertDisplay = 'none'
  }

  validateForm() {
    let isValid = true;
    if (this.user.rut == '') { isValid = false; this.errors.push('- Rut'); }
    if (this.user.age == 0) { isValid = false; this.errors.push('- Edad'); }
    if (this.user.firstName == '') { isValid = false; this.errors.push('- Nombre'); }
    if (this.user.middleName == '') { isValid = false; this.errors.push('- Segundo nombre'); }
    if (this.user.lastName == '') { isValid = false; this.errors.push('- Apellido'); }
    if (this.user.middleLastName == '') { isValid = false; this.errors.push('- Segundo apellido'); }
    if (this.user.phone == '') { isValid = false; this.errors.push('- Teléfono'); }
    if (this.user.email == '') { isValid = false; this.errors.push('- E-mail'); }
    if (this.user.gender == '') { isValid = false; this.errors.push('- Genero'); }
    if (this.user.specialization == '') { isValid = false; this.errors.push('Especialización'); }
    if (this.user.address == '') { isValid = false; this.errors.push('- Dirección') }
    return isValid;
  }

  onSubmit() {
    this.typeUserService.getByDesc('kine').subscribe(
      res => {
        if (this.validateForm()) {
          this.user.typeUser_fk = res._id;
          this.createUser();
        } else {
          this.alertDisplay = 'block';
        }
      },
      err => {
        console.log(err);
      }
    );

  }

  createUser() {
    this.usersService.addUser(this.user).subscribe(
      res => {
        console.log(res);
        this.successDisplay = 'block';
      },
      err => {
        console.log(err);

      }
    );
  }

  closeSuccess() {
    this.successDisplay = 'none';
  }

  closeAlert() {
    this.alertDisplay = 'none';
    this.errors = [];
  }

}