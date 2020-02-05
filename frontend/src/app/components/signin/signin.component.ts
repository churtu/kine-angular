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

  private errors = '';
  constructor(
    private loginService: LoginService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  validateForm() {
    let isValid = true;
    if (this.login.username == '') { isValid = false; this.errors += '\nInsert your username' }
    if (this.login.password == '') { isValid = false; this.errors += '\nInsert your password' }
    return isValid;
  }

  onSubmit() {
    if (this.validateForm()) {
      this.loginService.login(this.login).subscribe(
        res => {
          localStorage.setItem('token', res.token);
          this.router.navigate(['/profile']);
        },
        err => {
          console.log(err);
          alert('This user and/or password are incorrects');
        }
      )
    } else {
      alert(this.errors);
      this.errors = '';
    }

  }
}
