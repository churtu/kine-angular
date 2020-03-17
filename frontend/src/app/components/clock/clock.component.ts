
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-clock',
  templateUrl: './clock.component.html',
  styleUrls: ['./clock.component.scss']
})
export class ClockComponent implements OnInit {

  @ViewChild('hrHand', {static:false}) hrHand: ElementRef;
  @ViewChild('minHand', {static:false}) minHand: ElementRef;
  @ViewChild('secHand', {static:false}) secHand: ElementRef;
  constructor() { }

  ngOnInit() {
    setInterval(() => {
      const date = new Date();
      this.updateClock(date);
    })
  }

  updateClock(date){
    this.secHand.nativeElement.style.transform = 'rotate(' +
          date.getSeconds()*6+'deg)';
    this.minHand.nativeElement.style.transform = 'rotate(' +
          date.getMinutes()*6+'deg)';
    this.hrHand.nativeElement.style.transform = 'rotate(' +
          (date.getHours()*30+date.getMinutes()*0.5)+'deg';
  }

}
