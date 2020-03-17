import { CommunicationService } from './../../services/communication.service';
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
  private confirmDisplay = 'none';
  private errors = [];
  haveuser = false;
  public user = {
    firstName: '',
    middleName: '',
    lastName: '',
    middleLastName: ''
  };
  constructor(
    private userService: UsersService,
    private loginService: LoginService,
    public communicationService: CommunicationService
  ) { }
  username: string;
  ngOnInit() {
    this.nameDisplay = 'none';
    this.confirmDisplay = 'none';
    this.showUserName();
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
          if (res != null) {
            this.user = res;
          }
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
    this.user = {
      firstName: '',
      middleName: '',
      lastName: '',
      middleLastName: ''
    }
    this.nameDisplay = 'none';
  }

  openConfirm() {
    this.confirmDisplay = 'block';
  }
  closeConfirm() {
    this.confirmDisplay = 'none';
  }

}
