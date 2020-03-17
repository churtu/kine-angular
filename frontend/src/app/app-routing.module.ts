import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfileComponent } from './components/profile/profile.component';
import { SignupComponent } from './components/signup/signup.component';
import { SigninComponent } from './components/signin/signin.component';
import { NewUserComponent } from './components/new-user/new-user.component';
import { AboutComponent } from './components/about/about.component';
import { HomeComponent } from './components/home/home.component';
import { EvaluationComponent } from './components/evaluation/evaluation.component';
import { MedicalCareComponent } from './components/medical-care/medical-care.component';
import { MyPatientsComponent } from './components/my-patients/my-patients.component';
import { ScheduleComponent } from './components/schedule/schedule.component';
import { AgendaEvaluationComponent } from './components/agenda-evaluation/agenda-evaluation.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'evaluation',
    component: EvaluationComponent
  },
  {
    path: 'signup',
    component: SignupComponent
  },
  {
    path: 'signin',
    component: SigninComponent
  },
  {
    path: 'newUser',
    component: NewUserComponent
  },
  {
    path: 'about',
    component: AboutComponent
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'medical-care',
    component: MedicalCareComponent
  },
  {
    path: 'my-patients',
    component: MyPatientsComponent
  },
  {
    path: 'schedule',
    component: ScheduleComponent
  },
  {
    path: 'agenda-evaluation',
    component: AgendaEvaluationComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
