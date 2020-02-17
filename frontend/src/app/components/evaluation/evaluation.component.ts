import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { Route } from '@angular/compiler/src/core';

@Component({
  selector: 'app-evaluation',
  templateUrl: './evaluation.component.html',
  styleUrls: ['./evaluation.component.css']
})
export class EvaluationComponent implements OnInit {

  private warningDisplay='none';
  private successDisplay='none'
  constructor(
    private router: Router
  ) { }

  ngOnInit() {
    this.warningDisplay='none';
    this.successDisplay='none'
  }

  onSubmit(){
    this.showWarning();
  }
  showWarning(){
    this.warningDisplay='block';
  }
  closeWarning(){
    this.warningDisplay='none';
  }

  showSuccess(){
    this.successDisplay='block';
  }

  closeSuccess(){
    this.successDisplay='none';
  }

  redirect(){
    this.router.navigate(['/home']);
  }
}
