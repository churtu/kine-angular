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
  ) {}

  ngOnInit() {
    this.successDisplay = 'none';
    this.alertDisplay = 'none'
  }

  validateForm(){
    let isValid = true;
    if(this.user.rut == ''){isValid=false; this.errors.push('- Insert your rut');}
    if(this.user.age == 0){isValid=false; this.errors.push('- Insert your age');}
    if(this.user.firstName == ''){isValid=false; this.errors.push('- Insert your first name');}
    if(this.user.middleName == ''){isValid=false; this.errors.push('- Insert your middle name');}
    if(this.user.lastName == ''){isValid=false; this.errors.push('- Insert your last middle Last name');}
    if(this.user.middleLastName == ''){isValid=false; this.errors.push('- Insert your middle last name');}
    if(this.user.phone == ''){isValid=false; this.errors.push('- Insert your phone');}
    if(this.user.email == ''){isValid=false; this.errors.push('- Insert your email');}
    if(this.user.gender == ''){isValid=false; this.errors.push('- Insert your gender');}
    if(this.user.specialization == ''){isValid=false; this.errors.push('- Insert your specialization');}
    return isValid;
  }

  onSubmit() {
    this.typeUserService.getByDesc('kine').subscribe(
      res => {
        if(this.validateForm()){
          this.user.typeUser_fk = res._id;
          this.createUser();
        }else{
          this.alertDisplay = 'block';
        }
      },
      err => {
        console.log(err);
      }
    );

  }

  createUser() {
    this.usersService.create(this.user).subscribe(
      res => {
        console.log(res);
        this.successDisplay = 'block';
      },
      err => {
        console.log(err);
        
      }
    );
  }

  closeSuccess(){
    this.successDisplay = 'none';
  }

  closeAlert(){
    this.alertDisplay = 'none';
    this.errors=[];
  }

}
