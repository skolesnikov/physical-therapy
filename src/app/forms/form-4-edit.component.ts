import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { IPatient } from '../../models/patient';
import { IForm } from '../../models/form';
import { PatientService } from '../../services/patient.service';
import { FormService } from '../../services/form.service';

@Component({
    templateUrl: './form-4-edit.component.html',
    styleUrls: ['./form.component.css']
})
export class FormFourEditComponent implements OnInit, OnDestroy {
    form: IForm;
    patient: IPatient;
    patients: IPatient[];
    patientNames: string[] = [];
    clonedDate: Date;
    clonedPatientName: string;   
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
                .subscribe(patients => { this.patients = patients,
                            this.getPatientNames(patients)},
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
            this.formService.getNewForm(4, patientId).subscribe(
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
            patient => {
                this.patient = patient;
                this.clonedPatientName = this.getPatientName(patient) 
            },
            error => this.errorMessage = <any>error);
    }

    getPatientNames(patients: IPatient[]) {
        for(var i = 0; i < patients.length; i++) {
            this.patientNames.push(this.getPatientName(patients[i]));
        }
    }

    getPatientName(patient: IPatient) {
        return patient.lastName + ", " + patient.firstName;
    }

    getPatientId(patientName: string, patients: IPatient[]) {
        if (patients) {
           for(var i = 0; i < patients.length; i++) {
                if (this.getPatientName(patients[i]) == patientName) 
                    return patients[i].id;
                } 
        }                    
        return null;
    }

    saveForm(): void {
        this.alerts.push({
            type: 'info',
            msg: `Record has been saved`,
            timeout: 3000
        });

        this.formService.saveForm(this.form)
            .subscribe(
                form => {this.router.navigate([`/form-4-edit/${form.id}`]);},
                (error: any) => this.errorMessage = <any>error);
    }

    cloneForm(): void {
        this.form.id = 0;
        this.form.formDate = this.clonedDate;
        this.form.patientId = this.getPatientId(this.clonedPatientName, this.patients);
        this.patient = null;

        this.alerts.push({
            type: 'success',
            msg: `Record has been cloned`,
            timeout: 3000
        });

        this.formService.saveForm(this.form)
            .subscribe(
                form => {this.router.navigate([`/form-4-edit/${form.id}`]);},
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
                        this.router.navigate([`/form-4-print/${this.form.id}`]);},
                (error: any) => this.errorMessage = <any>error);
    }
}