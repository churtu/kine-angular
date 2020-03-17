import { LoginService } from './../../services/login.service';
import { UsersService } from './../../services/users.service';
import { CommunicationService } from './../../services/communication.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  username:string;
  specialization:string;
  constructor(
    public communicationService: CommunicationService,
    private usersService: UsersService,
    private loginService: LoginService
  ) { }

  ngOnInit() {
    this.username = localStorage.getItem('username');
    this.getSpecialization();
  }

  getSpecialization(){
    const { _id } = this.loginService.getLoginId();
    this.usersService.getUserByLoginId(_id).subscribe(
      res => {
        this.usersService.getKineDataByUserId(res._id).subscribe(
          res => this.specialization= res[0].specialization[0].description,
          err => console.log(err)
        )
      },
      err => console.log(err)
    );
  }

}
