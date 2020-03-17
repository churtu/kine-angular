import { CommunicationService } from './../../services/communication.service';
import { PatientService } from './../../services/patient.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { MatSort } from '@angular/material/sort';
import { AgendaService } from '../../services/agenda.service';
import { LoginService } from '../../services/login.service';
import { UsersService } from '../../services/users.service';
import { Router } from '@angular/router';

export interface PeriodicElement {
  _id:string;
  Nombre: string;
  Rut: string;
  Genero: string;
  Edad: number;
  Direccion: string;
  Telefono: string;
  Diagnostico: string;
}


let DATA: PeriodicElement[] = []

@Component({
  selector: 'app-my-patients',
  templateUrl: './my-patients.component.html',
  styleUrls: ['./my-patients.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})
export class MyPatientsComponent implements OnInit {
  private user: PeriodicElement[];
  displayedColumns = ['Nombre', 'Rut', 'Genero', 'Edad', 'Direccion', 'Telefono', 'Status', 'Options'];
  dataSource = new MatTableDataSource<PeriodicElement>();
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;


  constructor(
    private loginService: LoginService,
    private usersService: UsersService,
    private agendaService: AgendaService,
    private patientService: PatientService,
    private router: Router,
    private communicationService:CommunicationService
  ) { }

  ngOnInit() {
    DATA = [];
    this.getData();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getData() {
    const { _id } = this.loginService.getLoginId();
    this.usersService.getUserByLoginId(_id).subscribe(
      res => {
        this.user = res;
        this.getPatientsByKineId(res._id);
      },
      err => console.log(err)
    );
  }

  getPatientsByKineId(id) {
    this.patientService.getPatiensIdByKineId(id).subscribe(
      res => {
        res.forEach(patient_id => {
          this.usersService.getUserById(patient_id).subscribe(
            patient => {
              this.patientService.getTreatmentsByPatientId(patient_id).subscribe(
                res => {
                  DATA.push({
                    _id:patient._id,
                    Nombre: patient.firstName,
                    Edad: patient.age,
                    Genero: patient.gender,
                    Direccion: patient.address,
                    Rut: patient.rut,
                    Telefono: patient.phone,
                    Diagnostico:res[0].treatment[0].diagnostic
                  })
                  this.dataSource = new MatTableDataSource<PeriodicElement>(DATA);
                },
                err => console.log(err)
              )/*
             
              
              console.log(DATA)*/
            },
            err => console.log(err)
          )
        });
      },
      err => console.log(err)
    )
  }

  redirect(arg) {
    this.communicationService.patient_id=arg._id;
    this.router.navigate(['/evaluation']);
  }

}
