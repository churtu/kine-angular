import { CommunicationService } from './../../services/communication.service';
import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';


export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  // Validaciones campo requerido
  userNameFormControl = new FormControl('', [
    Validators.required
  ]);

  passwordFormControl = new FormControl('', [
    Validators.required
  ]);

  matcher = new MyErrorStateMatcher();

  // Inicializar propiedades
  private login = {
    username: '',
    password: ''
  }

  private errors = [];

  alertDisplay = 'none';
  successDisplay = 'none';
  haveuser = false;
  constructor(
    private loginService: LoginService,
    private router: Router,
    private communicationService: CommunicationService

  ) { }

  ngOnInit() {
    this.alertDisplay = 'none';
    this.successDisplay = 'none'
  }


  validateForm() {
    let isValid = true;
    if (this.login.username == '') { isValid = false; this.errors.push('Insert your username') }
    if (this.login.password == '') { isValid = false; this.errors.push('Insert your password') }
    return isValid;
  }

  onSubmit() {
    if (this.validateForm()) {
      this.loginService.login(this.login).subscribe(
        res => {
          localStorage.setItem('token', res.token);
          if (res.user) {
            localStorage.setItem('username', res.user.firstName + ' ' + res.user.middleName + ' ' + res.user.lastName + ' ' + res.user.middleLastName);
            this.haveuser = true;
          }
          this.successDisplay = 'block';
        },
        err => {
          console.log(err);
          this.errors.push('This user and/or password are incorrects');
          this.alertDisplay = 'block';
        }
      )
    } else {
      this.alertDisplay = 'block';
    }
  }


  redirect() {
    if (this.haveuser) {
      this.router.navigate(['/home']);
    } else {
      this.router.navigate(['/newUser']);
    }
  }
  closeAlert() {
    this.alertDisplay = 'none';
    this.errors = [];
  }
  closeSuccess() {
    this.successDisplay = 'none';
  }

}
