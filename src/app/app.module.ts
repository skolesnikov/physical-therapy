import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PatientComponent } from './patient/patient.component';
import { FormOneEditComponent } from './forms/form-1-edit.component';
import { FormOnePrintComponent } from './forms/form-1-print.component';
import { FormTwoEditComponent } from './forms/form-2-edit.component';
import { FormTwoPrintComponent } from './forms/form-2-print.component';
import { PatientService } from '../services/patient.service';
import { FormService } from '../services/form.service';
import { PatientFilterPipe } from '../pipes/patient-filter.pipe';
import { FormFilterPipe } from '../pipes/form-filter.pipe';
import { DatepickerModule } from 'ngx-bootstrap/datepicker';
import { ModalModule } from 'ngx-bootstrap/modal';
import { AlertModule } from 'ngx-bootstrap/alert';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    PatientComponent,
    FormOneEditComponent,
    FormOnePrintComponent,
    FormTwoEditComponent,
    FormTwoPrintComponent,
    PatientFilterPipe,
    FormFilterPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    DatepickerModule.forRoot(),
    ModalModule.forRoot(),
    AlertModule.forRoot()
  ],
  providers: [
    PatientService,
    FormService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }