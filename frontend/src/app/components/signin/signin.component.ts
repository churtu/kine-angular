import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {


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
    private router: Router

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
