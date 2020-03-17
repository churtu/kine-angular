import { CommunicationService } from './../../services/communication.service';
import { Router } from '@angular/router';
import { PatientService } from './../../services/patient.service';
import { UsersService } from './../../services/users.service';
import { LoginService } from './../../services/login.service';
import { AgendaService } from './../../services/agenda.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { MatSort } from '@angular/material/sort';
import * as moment from 'moment';


export interface PeriodicElement {
  _id:string;
  Nombre: string;
  Rut: string;
  Genero: string;
  Edad: number;
  Direccion: string;
  Telefono: string;
  Diagnostico: string;
  Type:string;
  Agenda_id:string;
}

let DATA: PeriodicElement[] = [];

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})
export class DataTableComponent implements OnInit {
  displayedColumns = ['Nombre', 'Rut', 'Genero', 'Edad', 'Direccion', 'Telefono', 'Status', 'Options'];
  dataSource = new MatTableDataSource<PeriodicElement>(DATA);
  @ViewChild(MatPaginator, null) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  constructor(
    private agendaService: AgendaService,
    private loginService: LoginService,
    private usersService: UsersService,
    private patientService: PatientService,
    private router:Router,
    private communicationService: CommunicationService
  ) { }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    DATA=[];
    this.getData()
  }
  /* Metodo para buscar en la tabla
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  */
  getData(){
    const today = moment(new Date).format('YYYY-MM-DD');
    const { _id } = this.loginService.getLoginId();
    this.usersService.getUserByLoginId(_id).subscribe(
      res => {
        this.agendaService.getAllAgendasByKineIdAndDate(res._id,today).subscribe(
          res => {
            res.forEach(element => {
              this.patientService.getTreatmentsByPatientId(element.patient_fk).subscribe(
                res => {
                  DATA.push({
                    _id:element.patient[0]._id,
                    Nombre:element.patient[0].firstName,
                    Rut:element.patient[0].rut,
                    Genero:element.patient[0].gender,
                    Edad:element.patient[0].age,
                    Diagnostico: res[0].treatment[0].diagnostic,
                    Direccion:element.patient[0].address,
                    Telefono: element.patient[0].phone,
                    Type: element.type,
                    Agenda_id: element._id
                  })
                  this.dataSource = new MatTableDataSource<PeriodicElement>(DATA);
                },
                err => console.log(err)
              )
              
            });
          },
          err => console.log(err)
        )
      },
      err => console.log(err)
    );
  }

  redirect(arg) {
    this.communicationService.agenda_id=arg.Agenda_id;
    this.communicationService.patient_id=arg._id;
    this.router.navigate(['/evaluation']);
  }

}
