import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PatientComponent } from './patient/patient.component';
import { FormOneEditComponent } from './forms/form-1-edit.component';
import { FormOnePrintComponent } from './forms/form-1-print.component';
import { FormTwoEditComponent } from './forms/form-2-edit.component';
import { FormTwoPrintComponent } from './forms/form-2-print.component';
import { FormThreeEditComponent } from './forms/form-3-edit.component';
import { FormThreePrintComponent } from './forms/form-3-print.component';
import { FormFourEditComponent } from './forms/form-4-edit.component';
import { FormFourPrintComponent } from './forms/form-4-print.component';
import { FormXEditComponent } from './forms/form-x-edit.component';
import { FormXPrintComponent } from './forms/form-x-print.component';
import { PrintGuard } from '../guards/print-guard.service';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
  { path: 'dashboard', component: DashboardComponent},
  { path: 'patient/:id', component: PatientComponent },
  { path: 'form-1-edit/:id/:patientId', component: FormOneEditComponent },
  { path: 'form-1-edit/:id', component: FormOneEditComponent },
  { path: 'form-1-print/:id', component: FormOnePrintComponent, canActivate: [ PrintGuard] },
  { path: 'form-2-edit/:id/:patientId', component: FormTwoEditComponent },
  { path: 'form-2-edit/:id', component: FormTwoEditComponent },
  { path: 'form-2-print/:id', component: FormTwoPrintComponent, canActivate: [ PrintGuard] },
  { path: 'form-3-edit/:id/:patientId', component: FormThreeEditComponent },
  { path: 'form-3-edit/:id', component: FormThreeEditComponent },
  { path: 'form-3-print/:id', component: FormThreePrintComponent, canActivate: [ PrintGuard] },
  { path: 'form-4-edit/:id/:patientId', component: FormFourEditComponent },
  { path: 'form-4-edit/:id', component: FormFourEditComponent },
  { path: 'form-4-print/:id', component: FormFourPrintComponent, canActivate: [ PrintGuard] },
  { path: 'form-x-edit/:formTypeId/:id/:patientId', component: FormXEditComponent },
  { path: 'form-x-edit/:formTypeId/:id', component: FormXEditComponent },
  { path: 'form-x-print/:id', component: FormXPrintComponent, canActivate: [ PrintGuard] },
  { path: '**', pathMatch: 'full', component: DashboardComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [PrintGuard]
})

export class AppRoutingModule { }
