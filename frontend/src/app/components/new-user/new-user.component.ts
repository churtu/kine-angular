import { Component, OnInit } from '@angular/core';
import { TypeUserService } from '../../services/type-user.service';
import { UsersService } from '../../services/users.service';
import { Router } from '@angular/router';
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.css']
})
export class NewUserComponent implements OnInit {

  rutFormControl = new FormControl('', [
    Validators.required
  ]);

  ageFormControl = new FormControl('', [
    Validators.required,
    Validators.pattern(/^\d*$/)
  ]);

  firstNameFormControl = new FormControl('', [
    Validators.required
  ]);

  middleNameFormControl = new FormControl('', [
    Validators.required
  ]);

  lastNameFormControl = new FormControl('', [
    Validators.required
  ]);

  middleLastNameFormControl = new FormControl('', [
    Validators.required
  ]);

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email
  ]);

  phoneFormControl = new FormControl('', [
    Validators.required
  ]);

  addressFormControl = new FormControl('', [
    Validators.required
  ]);

  specializationFormControl = new FormControl('', [
    Validators.required
  ]);


  matcher = new MyErrorStateMatcher();

  private user = {
    rut: '',
    age: '',
    firstName: '',
    middleName: '',
    lastName: '',
    middleLastName: '',
    phone: '',
    email: '',
    address: '',
    gender: '',
    type_user_fk: ''
  }

  private kine_data = {
    specialization_fk:'',
    kine_fk:''
  }

  specializations =[];
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
    this.alertDisplay = 'none';
    this.usersService.getSpecializations().subscribe(
      res =>{
        this.specializations = res;
      },
      err => console.log(err)
    )
  }

  validateForm() {
    let isValid = true;
    if (this.user.rut == '') { isValid = false; this.errors.push('- Rut'); }
    if (this.user.age == '') { isValid = false; this.errors.push('- Edad'); }
    if (this.user.firstName == '') { isValid = false; this.errors.push('- Nombre'); }
    if (this.user.middleName == '') { isValid = false; this.errors.push('- Segundo nombre'); }
    if (this.user.lastName == '') { isValid = false; this.errors.push('- Apellido'); }
    if (this.user.middleLastName == '') { isValid = false; this.errors.push('- Segundo apellido'); }
    if (this.user.phone == '') { isValid = false; this.errors.push('- Teléfono'); }
    if (this.user.email == '') { isValid = false; this.errors.push('- E-mail'); }
    if (this.user.gender == '') { isValid = false; this.errors.push('- Genero'); }
    if (this.kine_data.specialization_fk == '') { isValid = false; this.errors.push('Especialización'); }
    if (this.user.address == '') { isValid = false; this.errors.push('- Dirección') }
    return isValid;
  }

  onSubmit() {
    this.typeUserService.getByDesc('kine').subscribe(
      res => {
        if (this.validateForm()) {
          this.user.type_user_fk = res._id;
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
        localStorage.setItem('username', res.firstName +' '+ res.middleName +' '+ res.lastName +' '+ res.middleLastName);
        this.kine_data.kine_fk=res._id;
        this.usersService.addKine_data(this.kine_data).subscribe(
          res => {
            this.successDisplay = 'block';
          },
          err => console.log(err)
        )
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

  setGender(arg){
    this.user.gender = arg;
  }

}
