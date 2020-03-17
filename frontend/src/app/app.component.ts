import { LoginService } from './services/login.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  isLogged:boolean;
  constructor(
    private loginService: LoginService
  ){}

  verifyLogin(){
    this.isLogged=this.loginService.isLogged();
  }
}
