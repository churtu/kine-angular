import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css'],
})

export class NavigationComponent implements OnInit {
  private login = {
    username: '',
    password: ''
  }

  private nameDisplay = 'none';
  private errors = [];
  haveuser = false;
  public user = {};
  constructor(
    private userService: UsersService,
    private loginService: LoginService
  ) { }

  ngOnInit() {
    this.nameDisplay = 'none';
  }


  showUserName() {
    if (this.nameDisplay === 'block') {
      this.nameDisplay = 'none';
    } else {
      this.nameDisplay = 'block';
    }
    if (this.loginService.isLogged()) {
      const { _id } = this.loginService.getLoginId();
      this.userService.getUserByLoginId(_id).subscribe(
        res => {
          this.user = res;
        },
        err => console.log(err)
      );
    }
  }
  validateForm() {
    let isValid = true;
    if (this.login.username == '') { isValid = false; this.errors.push('Insert your username') }
    if (this.login.password == '') { isValid = false; this.errors.push('Insert your password') }
    return isValid;
  }

  cleanUser() {
    this.user = {}
    this.nameDisplay='none';
  }

}
