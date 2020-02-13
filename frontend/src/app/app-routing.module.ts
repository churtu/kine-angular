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
import { AuthGuard } from './guards/auth.guard';
import { AddPatientComponent } from './components/add-patient/add-patient.component';

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
    path: 'add-patient',
    component: AddPatientComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
