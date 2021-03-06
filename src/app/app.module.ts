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
import { FormThreeEditComponent } from './forms/form-3-edit.component';
import { FormThreePrintComponent } from './forms/form-3-print.component';
import { FormFourEditComponent } from './forms/form-4-edit.component';
import { FormFourPrintComponent } from './forms/form-4-print.component';
import { FormXEditComponent } from './forms/form-x-edit.component';
import { FormXPrintComponent } from './forms/form-x-print.component';
import { PatientService } from '../services/patient.service';
import { FormService } from '../services/form.service';
import { FormTypeService } from '../services/form-type.service';
import { PatientFilterPipe } from '../pipes/patient-filter.pipe';
import { FormFilterPipe } from '../pipes/form-filter.pipe';
import { FormTypeFilterPipe } from '../pipes/form-type-filter.pipe';
import { CountdownPipe } from '../pipes/countdown.pipe';
import { DatepickerModule } from 'ngx-bootstrap/datepicker';
import { ModalModule } from 'ngx-bootstrap/modal';
import { AlertModule } from 'ngx-bootstrap/alert';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    PatientComponent,
    FormOneEditComponent,
    FormOnePrintComponent,
    FormTwoEditComponent,
    FormTwoPrintComponent,
    FormThreeEditComponent,
    FormThreePrintComponent, 
    FormFourEditComponent,  
    FormFourPrintComponent, 
    FormXEditComponent,  
    FormXPrintComponent,
    PatientFilterPipe,
    FormFilterPipe,
    FormTypeFilterPipe,
    CountdownPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    DatepickerModule.forRoot(),
    ModalModule.forRoot(),
    AlertModule.forRoot(),
    TypeaheadModule.forRoot(),
    BsDropdownModule.forRoot()
  ],
  providers: [
    PatientService,
    FormService,
    FormTypeService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }