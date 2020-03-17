import { AgendaService } from './../../services/agenda.service';
import { CommunicationService } from './../../services/communication.service';
import { Component, OnInit } from '@angular/core';
import dayGridPugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { UsersService } from '../../services/users.service';
import { LoginService } from '../../services/login.service';

export interface CalendarEvent {
  title: string;
  date: Date;
  color: string;
}

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent implements OnInit {

  private username: string;
  private user = {_id:''};
  private calendarEvents: CalendarEvent[] = [];
  private sessionDisplay = 'none';
  private dateModal = 'none';
  private doneSessionsDisplay = 'none';
  public calendarPlugins = [dayGridPugin, interactionPlugin];
  private dayEvents: any[] = [];
  private agendaDate;
  private dayDateNoFormat;
  private agenda = {
    title: '',
    color: '',
    date: '',
    patient_fk: '',
    kine_fk: '',
    type:''
  }

  constructor(
    private usersService: UsersService,
    private loginService: LoginService,
    private agendaService: AgendaService,
    private communicationService: CommunicationService,
    
  ) { }


  ngOnInit() {
    this.sessionDisplay = 'none';
    this.dateModal = 'none';
    this.doneSessionsDisplay = 'none';
    this.username = localStorage.getItem('username');
    this.getData();
    if (this.communicationService.sessions) {
      this.sessionDisplay = 'block';
    }
  }

  getData() {
    let kineId;
    const { _id } = this.loginService.getLoginId();
    this.usersService.getUserByLoginId(_id).subscribe(
      res => {
        kineId = res._id;
        this.agendaService.getAllAgendasByKineId(kineId).subscribe( // se obtienen las agendas del kine logeado
          res => {
            // Se asigna la respuesta al arreglo de eventos con su nombre formateado
            this.calendarEvents = res;
            for (let index = 0; index < res.length; index++) {
              this.calendarEvents[index].title = res[index].patient[0].firstName + ' ' + res[index].patient[0].lastName;
            }
          },
          err => console.log(err)
        )
      },
      err => console.log(err)
    )
  }

  dateClick(arg) {
    
    if(this.communicationService.sessions>0){
      this.dayDateNoFormat = arg.dateStr;
      const { _id } = this.loginService.getLoginId();
      this.usersService.getUserByLoginId(_id).subscribe(
        res => {
          this.user = res;
          this.agendaService.getAllAgendasByKineIdAndDate(res._id, arg.dateStr).subscribe(
            res => {
              this.dayEvents=res;
              this.dateModal = 'block';
            },
            err => console.log(err)
          )
        },
        err => console.log(err)
      );
    }else if(this.communicationService.sessions==0){
      this.doneSessionsDisplay = 'block';
    }
    
  }

  closeDateModal() {
    this.dateModal = 'none';
  }

  closeSessionModal() {
    this.sessionDisplay = 'none';
  }

  getAgendaHour(hour) {
    this.agendaDate = this.dayDateNoFormat + hour;
  }

  addAgenda(){
    this.agenda.type='session';
    this.agenda.color='#00a8ff';
    this.agenda.date= this.agendaDate;
    this.agenda.patient_fk=this.communicationService.patient_id;
    this.usersService.getUserById(this.communicationService.patient_id).subscribe(
      res => {
        this.agenda.title = res.firstName+' '+res.lastName;
        this.agenda.kine_fk = this.user._id;
        this.agendaService.addAgenda(this.agenda).subscribe(
          res => {
            this.dateModal = 'none';
            this.communicationService.setSessions();
            this.ngOnInit();
          },
          err => console.log(err)
        )
      },
      err => console.log(err)
    )
  }

  closeDoneModal(){
    this.doneSessionsDisplay = 'none';
  }
}
