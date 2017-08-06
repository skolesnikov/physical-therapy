import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';

import { Subscription } from 'rxjs/Subscription';

import { IPatient } from '../../models/patient';
import { IForm } from '../../models/form';

import { PatientService } from '../../services/patient.service';
import { FormService } from '../../services/form.service';

@Component({
    templateUrl: './form-1-edit.component.html',
    styleUrls: ['./form.component.css']
})
export class FormOneEditComponent implements OnInit, OnDestroy {
    form: IForm;
    clonedDate: Date;
    clonedPatientId: string;
    patient: IPatient;
    patients: IPatient[];
    errorMessage: string;
    showDatePicker: boolean;
    showClonedDatePicker: boolean;
    alerts: any = [];
    private sub: Subscription;

    constructor(private route: ActivatedRoute,
                private router: Router,
                private formService: FormService,
                private patientService: PatientService) {
    }

    ngOnInit(): void {
        var now = new Date();
        this.clonedDate = new Date(
                    now.getFullYear(), 
                    now.getMonth(), 
                    now.getDate(),
                    0,0,0,);

        this.sub = this.route.params.subscribe(
            params => {
                let id = +params['id'];
                let patientId = params['patientId'];
                this.getForm(id, patientId);
        }); 

        this.patientService.getPatients()
                .subscribe(patients => this.patients = patients,
                           error => this.errorMessage = <any>error);
            
        this.router.events.subscribe((evt) => {
            if (!(evt instanceof NavigationEnd)) {
                return;
            }
            window.scrollTo(0, 0);
        });
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }

    getForm(id: number, patientId: string) {
        if (id === 0) {
            this.formService.getNewForm(1, patientId).subscribe(
                        form => {this.form = form; 
                        this.getPatient(patientId);},            
                        error => this.errorMessage = <any>error);
        } else {
            this.formService.getForm(id).subscribe(
                        form => {this.form = form; 
                        this.getPatient(form.patientId);},            
                        error => this.errorMessage = <any>error);
        }        
    }

    getPatient(id: string) {
        this.patientService.getPatient(id).subscribe(
            patient => {this.patient = patient;
                this.clonedPatientId = patient.id},
            error => this.errorMessage = <any>error);
    }

    saveForm(): void {
        this.alerts.push({
            type: 'info',
            msg: `Record has been saved`,
            timeout: 3000
        });

        this.formService.saveForm(this.form)
            .subscribe(
                form => {this.router.navigate([`/form-1-edit/${form.id}`]);},
                (error: any) => this.errorMessage = <any>error);
    }

    cloneForm(): void {
        this.form.id = 0;
        this.form.formDate = this.clonedDate;
        this.form.patientId = this.clonedPatientId;
        this.patient = null;

        this.alerts.push({
            type: 'success',
            msg: `Record has been cloned`,
            timeout: 3000
        });

        this.formService.saveForm(this.form)
            .subscribe(
                form => {this.router.navigate([`/form-1-edit/${form.id}`]);},
                (error: any) => this.errorMessage = <any>error);
    }

    deleteForm(): void {
        this.formService.deleteForm(this.form.id)
            .subscribe(
                () => this.onBack(),
                (error: any) => this.errorMessage = <any>error);
    }

    onBack(): void {
        this.router.navigate([`/patient/${this.form.patientId}`]);
    }

    onPrint(): void {
        this.formService.saveForm(this.form)
            .subscribe(
                form => {this.form = form; 
                        this.router.navigate([`/form-1-print/${this.form.id}`]);},
                (error: any) => this.errorMessage = <any>error);
    }
}