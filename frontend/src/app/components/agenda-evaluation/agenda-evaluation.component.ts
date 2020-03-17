import { Component, OnInit } from '@angular/core';
import dayGridPugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { UsersService } from '../../services/users.service';
import { AgendaService } from '../../services/agenda.service';
import { PatientService } from '../../services/patient.service';
import { TreatmentService } from '../../services/treatment.service';
import * as moment from 'moment';
import 'moment/locale/es';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

export interface CalendarEvent {
  title: string;
  color: string;
  date: Date;
  kine_fk: string;
  patient_fk: string;
}

@Component({
  selector: 'app-agenda-evaluation',
  templateUrl: './agenda-evaluation.component.html',
  styleUrls: ['./agenda-evaluation.component.css']
})
export class AgendaEvaluationComponent implements OnInit {

  diagnosticFormControl = new FormControl('', [
    Validators.required
  ]);
  rutFormControl = new FormControl('', [
    Validators.required
  ]);
  previtionFormControl = new FormControl('', [
    Validators.required
  ]);
  firstNameFormControl = new FormControl('', [
    Validators.required
  ]);
  middleNameFormControl = new FormControl('', [
    Validators.required
  ]);
  lastNameFormControl = new FormControl('', [
    Validators.required
  ]);
  middleLastNameFormControl = new FormControl('', [
    Validators.required
  ]);

  ageFormControl = new FormControl('', [
    Validators.required,
    Validators.pattern(/^\d*$/)
  ]);

  addressFormControl = new FormControl('', [
    Validators.required
  ]);

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email
  ]);

  phoneFormControl = new FormControl('', [
    Validators.required,
    Validators.pattern(/^\d*$/)
  ]);

  matcher = new MyErrorStateMatcher();

  private previtions = ['Fonasa A', 'Fonasa B', 'Isapre'];
  private dateModal = 'none';
  private calendarEvents: CalendarEvent[] = [];
  private dateClicked;
  calendarPlugins = [dayGridPugin, interactionPlugin];
  private kines: [] = [];
  private id: string;
  private dayEvents: any[] = [];
  private dayDateNoFormat;
  private agendaDate;
  private warningDisplay = 'none';
  private errorDisplay = 'none';

  private user = {
    rut: '',
    age: '',
    address: '',
    phone: '',
    firstName: '',
    middleName: '',
    lastName: '',
    middleLastName: '',
    gender: '',
    email: ''
  }

  private patient_data = {
    prevition: '',
    patient_fk: ''
  }

  private treatment = {
    diagnostic: '',
    sessions: '',
    patient_data_fk: ''
  }

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
    private agendaService: AgendaService,
    private patientService: PatientService,
    private treatmentService: TreatmentService
  ) { }

  ngOnInit() {
    this.dateModal = 'none';
    this.warningDisplay = 'none';
    this.errorDisplay = 'none';
    this.getDlData();
    this.getCalendarData();

  }

  getDlData() {
    this.usersService.getAllKines().subscribe(
      res => {
        this.kines = res;
      },
      err => console.log(err)
    )
  }

  getCalendarData() {
    if (this.id) {
      this.agendaService.getAllAgendasByKineId(this.id).subscribe(
        res => {
          this.calendarEvents = res;
        },
        err => console.log(err)
      )
    }
  }

  getDayEvents(day) {
    this.agendaService.getAllAgendasByKineId(this.id).subscribe(
      res => {
        res.forEach(element => {
          if (moment(element.date).format('YYYY-MM-DD') == day.dateStr) {
            this.dayEvents.push(element);
          }
        });
      },
      err => console.log(err)
    )
  }

  dateClick(arg) {
    if (this.id) {
      this.agendaService.getAllAgendasByKineIdAndDate(this.id, arg.dateStr).subscribe(
        res => {
          if (res.length < 3) {
            this.dayDateNoFormat = arg.dateStr;
            this.dateClicked = moment(arg.dateStr).format('DD-MMMM-YYYY');
            this.getDayEvents(arg);
            this.dateModal = 'block';
          }else{
            this.errorDisplay = 'block';
          }
        },
        err => console.log(err)
      )

    }
  }

  eventClick(arg) {
    this.dateClicked = arg.dateStr;
    console.log('Event Click')
  }

  closeDateModal() {
    this.dateModal = 'none';
    this.dayEvents = [];
    this.clearData();
  }

  onSubmit() {
    this.warningDisplay = 'block';
  }
  addAgenda() {
    if (this.agendaDate) {
      this.agenda.date = this.agendaDate;
      this.usersService.addUser(this.user).subscribe(
        res => {
          this.patient_data.patient_fk = res._id;
          this.agenda.title = res.firstName + ' ' + res.lastName;
          this.agenda.color = '#fbc531';
          this.agenda.kine_fk = this.id;
          this.agenda.patient_fk = res._id;
          this.agenda.type = 'ingreso';
          this.patientService.addPatient_data(this.patient_data).subscribe(
            res => {
              this.treatment.patient_data_fk = res._id;
              this.treatmentService.addTreatment(this.treatment).subscribe(
                res => {
                  this.agendaService.addAgenda(this.agenda).subscribe(
                    res => {
                      this.warningDisplay = 'none';
                      this.dateModal = 'none';
                      this.clearData();
                      this.ngOnInit();
                    },
                    err => console.log(err)
                  )
                },
                err => console.log(err)
              )
            },
            err => console.log(err)
          )
        },
        err => console.log(err)
      )
    }
  }

  getAgendaHour(hour) {
    this.agendaDate = this.dayDateNoFormat + hour;
  }

  closeWarning() {
    this.warningDisplay = 'none';
  }

  clearData() {
    this.user.firstName = '';
    this.user.gender = '';
    this.user.lastName = '';
    this.user.middleLastName = '';
    this.user.middleName = '';
    this.user.rut = '';
    this.patient_data.prevition = '';
    this.treatment.diagnostic = '';
    this.rutFormControl.reset();
    this.previtionFormControl.reset();
    this.firstNameFormControl.reset();
    this.middleNameFormControl.reset();
    this.lastNameFormControl.reset();
    this.middleLastNameFormControl.reset();
    this.diagnosticFormControl.reset();
  }
  setGender(arg) {
    this.user.gender = arg;
  }

  closeAlert(){
    this.errorDisplay = 'none';
  }
}
