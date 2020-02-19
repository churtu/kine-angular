import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Route } from '@angular/compiler/src/core';
import { PatientService } from '../../services/patient.service';
import { EvaluationService } from '../../services/evaluation.service';
import { LoginService } from '../../services/login.service';
import { UsersService } from '../../services/users.service';
import { TreatmentService } from '../../services/treatment.service';

@Component({
  selector: 'app-evaluation',
  templateUrl: './evaluation.component.html',
  styleUrls: ['./evaluation.component.css']
})
export class EvaluationComponent implements OnInit {

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
    diagnostic: '',
    sessions: '',
    patient_data_fk: ''
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
    private treatmentService: TreatmentService
  ) { }

  ngOnInit() {
    this.warningDisplay = 'none';
    this.successDisplay = 'none'
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

  redirect() {
    this.router.navigate(['/home']);
  }

  addData() {
    this.userService.addUser(this.user).subscribe(
      res => {
        this.patient_data.patient_fk = res._id; // Se asigna el id del user creado a patient_data
        this.patientService.addPatient_data(this.patient_data).subscribe(// se crea un patient_data
          res => {
            this.evaluation.patient_data_fk = res._id; //asignacion de atributos foraneos
            this.treatment.patient_data_fk = res._id;
            const { _id } = this.loginService.getLoginId(); // obtengo el id del login actual
            this.userService.getUserByLoginId(_id).subscribe(//obtengo el usuario logeado actual
              res => {
                this.userService.getKineDataByUserId(res._id).subscribe(
                  res => {
                    this.evaluation.kine_data_fk = res._id;
                    this.evaluationService.addEvaluation(this.evaluation).subscribe( // Se ingresa una nueva evaluacion
                      res => {
                        this.treatmentService.addTreatment(this.treatment).subscribe( // Se agrega un tratamiento
                          res => this.showSuccess(),
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
