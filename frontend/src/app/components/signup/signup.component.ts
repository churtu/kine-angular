import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  userNameFormControl = new FormControl('', [
    Validators.required
  ]);
  passwordFormControl = new FormControl('', [
    Validators.required
  ]);
  confirmPasswordFormControl = new FormControl('', [
    Validators.required
  ]);

  matcher = new MyErrorStateMatcher();

  private login = {
    username: '',
    password: '',
    confirmPassword: ''
  }

  errors = [];

  successDisplay = 'none';
  alertDisplay = 'none';

  constructor(
    private loginService: LoginService,
  ) { }

  ngOnInit() {
    this.successDisplay = 'none';
    this.alertDisplay = 'none';
  }

  cleanLogin() {
    this.login.username = '';
    this.login.password = '';
    this.login.confirmPassword = '';
  }

  validateForm() {
    let isValid = true;
    if (this.login.password != this.login.confirmPassword) { isValid = false; this.errors.push('- Passwords do not match.') }
    if (this.login.username == '') { isValid = false; this.errors.push('- Insert your username.') }
    if (this.login.password == '') { isValid = false; this.errors.push('- Insert your password.') }
    if (this.login.confirmPassword == '') { isValid = false; this.errors.push('- Confirm your password.') }
    return isValid;
  }

  onSubmit() {
    if (this.validateForm()) {
      this.loginService.signup(this.login).subscribe(
        res => {
          localStorage.setItem('token', res.token);
          this.cleanLogin();
          this.successDisplay = 'block';
        },
        err => {
          console.log(err);
          this.errors.push('- This user already exists.');
          this.alertDisplay = 'block';
          //alert('This user already exists!')
        }
      )
    } else {

      this.alertDisplay = 'block';
    }

  }

  successModal() {
    this.successDisplay = 'block';
  }

  alertModal() {
    this.alertDisplay = 'block';
  }

  closeAlert() {
    this.alertDisplay = 'none';
    this.errors = [];
  }

  closeSuccess() {
    this.successDisplay = 'none';
  }

}


