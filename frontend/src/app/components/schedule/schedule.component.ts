import { Component, OnInit } from '@angular/core';
import dayGridPugin from '@fullcalendar/daygrid';
import esLocale from '@fullcalendar/core/locales/es';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  calendarPlugins = [dayGridPugin];

  handleDateClick(arg) { // handler method
    console.log(arg.dateStr);
  }
}
