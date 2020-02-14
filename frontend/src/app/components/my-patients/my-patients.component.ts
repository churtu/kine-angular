import { PatientService } from './../../services/patient.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { MatSort } from '@angular/material/sort';
import { AgendaService } from '../../services/agenda.service';
import { LoginService } from '../../services/login.service';
import { UsersService } from '../../services/users.service';

export interface PeriodicElement {
  Nombre: string;
  Rut: string;
  Genero: string;
  Edad: number;
  Direccion: string;
  Telefono: string;
  Diagnostico: string;
}


let DATA: PeriodicElement[] = [

]

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
  displayedColumns = ['Nombre', 'Rut', 'Genero', 'Edad', 'Direccion', 'Telefono'];
  dataSource = new MatTableDataSource<PeriodicElement>();
  @ViewChild(MatPaginator, null) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;


  constructor(
    private loginService: LoginService,
    private usersService: UsersService,
    private agendaService: AgendaService,
    private PatientService: PatientService
  ) { }

  ngOnInit() {
    DATA=[];
    this.getLoggedUser();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getLoggedUser() {
    const { _id } = this.loginService.getLoginId();
    this.usersService.getUserByLoginId(_id).subscribe(
      res => {
        this.user = res;
        this.getAgendasByKineId(res._id);
      },
      err => console.log(err)
    );
  }

  getAgendasByKineId(id) {
    this.agendaService.getAllAgendasByKineId(id).subscribe(
      res => {
        res.forEach(element => {
          this.PatientService.getTreatmentsByPatientId(element.patient_fk).subscribe(
            res => {
              DATA.push({
                Nombre: element.patient[0].firstName,
                Rut: element.patient[0].rut,
                Genero: element.patient[0].gender,
                Edad: element.patient[0].age,
                Direccion: element.patient[0].address,
                Telefono: element.patient[0].phone,
                Diagnostico: res[0].treatment[0].diagnostic
              })
              this.dataSource = new MatTableDataSource<PeriodicElement>(DATA);
            },
            err => console.log(err)
          );
        });
      },
      err => console.log(err)
    )
  }
}
