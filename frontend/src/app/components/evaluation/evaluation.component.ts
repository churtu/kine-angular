import { style } from '@angular/animations';
import { CommunicationService } from './../../services/communication.service';
import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { PatientService } from '../../services/patient.service';
import { EvaluationService } from '../../services/evaluation.service';
import { LoginService } from '../../services/login.service';
import { UsersService } from '../../services/users.service';
import { TreatmentService } from '../../services/treatment.service';
import { AgendaService } from '../../services/agenda.service';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-evaluation',
  templateUrl: './evaluation.component.html',
  styleUrls: ['./evaluation.component.css']
})
export class EvaluationComponent implements OnInit {

  sessionsFormControl = new FormControl('', [
    Validators.required,
    Validators.pattern(/^\d*$/)
  ]);

  matcher = new MyErrorStateMatcher();

  private user = {
    rut: '',
    firstName: '',
    middleName: '',
    lastName: '',
    middleLastName: '',
    gender: '',
    age: '',
    email: '',
    phone: '',
    address: '',
    login_fk: '',
    type_user_fk: '5e3f14e346e320175c47272e' // Patient type
  }
  private patient_data = {
    prevition: '',
    patient_fk: ''
  }

  private evaluation = {
    anamnesis: '',
    complementStudies: '',
    hypothesis: '',
    treatment_plan: '',
    type_eval_fk: '5e4312cedbd57d2ed0d1da7a', // Initial evaluation
    patient_data_fk: '',
    kine_data_fk: ''
  }

  private treatment = {
    _id: '',
    diagnostic: '',
    sessions: '',
    patient_data_fk: ''
  }

  private agenda = {
    date: 0,
    kine_fk: '',
    patient_fk: ''
  }

  private previtions = ['Fonasa A', 'Fonasa B', 'Isapre']
  private warningDisplay = 'none';
  private successDisplay = 'none'
  constructor(
    private router: Router,
    private userService: UsersService,
    private patientService: PatientService,
    private evaluationService: EvaluationService,
    private loginService: LoginService,
    private treatmentService: TreatmentService,
    private agendaService: AgendaService,
    public communicationService: CommunicationService
  ) { }

  ngOnInit() {
    this.warningDisplay = 'none';
    this.successDisplay = 'none';
    if (this.communicationService.patient_id) {
      this.getPatientData();
    } else {
      this.router.navigate(['/home']);
    }

  }

  onSubmit() {
    this.showWarning();
  }
  showWarning() {
    this.warningDisplay = 'block';
  }
  closeWarning() {
    this.warningDisplay = 'none';
  }

  showSuccess() {
    this.successDisplay = 'block';
  }

  closeSuccess() {
    this.successDisplay = 'none';
  }



  /*
  addData() {
    this.userService.addUser(this.user).subscribe(
      res => {
        this.agenda.patient_fk = res._id;
        this.patient_data.patient_fk = res._id; // Se asigna el id del user creado a patient_data
        this.patientService.addPatient_data(this.patient_data).subscribe(// se crea un patient_data
          res => {
            this.evaluation.patient_data_fk = res._id; //asignacion de atributos foraneos
            this.treatment.patient_data_fk = res._id;
            const { _id } = this.loginService.getLoginId(); // obtengo el id del login actual
            this.userService.getUserByLoginId(_id).subscribe(//obtengo el usuario logeado actual
              res => {
                this.agenda.kine_fk=res._id;
                this.userService.getKineDataByUserId(res._id).subscribe(
                  res => {
                    this.evaluation.kine_data_fk = res._id;
                    this.evaluationService.addEvaluation(this.evaluation).subscribe( // Se ingresa una nueva evaluacion
                      res => {
                        this.treatmentService.addTreatment(this.treatment).subscribe( // Se agrega un tratamiento
                          res => {
                            this.agenda.date = Date.now();
                            this.agendaService.addAgenda(this.agenda).subscribe(
                            res => this.showSuccess(),
                            err => console.log(err)
                          )},
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
          },
          err => console.log(err)
        )
      },
      err => console.log(err)
    )
  }*/

  getPatientData() {
    this.userService.getUserById(this.communicationService.patient_id).subscribe(
      res => {
        this.user = res;
        this.patientService.getTreatmentsByPatientId(res._id).subscribe(
          res => {
            this.patient_data = res[0];
            this.treatment = res[0].treatment[0];
          },
          err => console.log(err)
        )
      },
      err => console.log(err)
    )
  }

  addData() {
    this.patientService.getPatientDataByUserId(this.communicationService.patient_id).subscribe(
      res => {
        this.evaluation.patient_data_fk = res._id;
        const { _id } = this.loginService.getLoginId();
        this.userService.getUserByLoginId(_id).subscribe(
          res => {
            this.userService.getKineDataByUserId(res._id).subscribe(
              res => {
                this.evaluation.kine_data_fk = res._id;
                this.treatmentService.putTreatment(this.treatment._id, this.treatment).subscribe(
                  res => {
                    this.communicationService.sessions = Number.parseInt(this.treatment.sessions);
                    this.evaluationService.addEvaluation(this.evaluation).subscribe(
                      res => {
                        this.agendaService.putAgenda(this.communicationService.agenda_id, { type: 'closed',color:'#4cd137' }).subscribe(
                          res => {
                            this.showSuccess();
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
          },
          err => console.log(err)
        )
      },
      err => console.log(err)
    )
  }
}
