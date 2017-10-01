import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { IPatient } from '../../models/patient';
import { IForm } from '../../models/form';
import { IQuestion } from '../../models/question';

import { PatientService } from '../../services/patient.service';
import { FormService } from '../../services/form.service';

@Component({
    templateUrl: './form-x-print.component.html',
    styleUrls: ['./form.component.css']
})
export class FormXPrintComponent implements OnInit, OnDestroy {
    form: IForm;
    patient: IPatient;
    errorMessage: string;
    private sub: Subscription;

    constructor(private route: ActivatedRoute,
                private router: Router,
                private formService: FormService,
                private patientService: PatientService) {
    }

    ngOnInit(): void {
        this.sub = this.route.params.subscribe(
            params => {
                let id = +params['id'];
                this.getForm(id);
        });        
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }

    getForm(id: number) {
        this.formService.getForm(id).subscribe(
            form => {this.form = form; 
            this.getPatient(form.patientId);
        },            
            error => this.errorMessage = <any>error);
    }

    getPatient(id: string) {
        this.patientService.getPatient(id).subscribe(
            patient => this.patient = patient,
            error => this.errorMessage = <any>error,
            () => setTimeout(()=>{ window.print() }, 1000)
        );            
    }

    onBack(): void {
        this.router.navigate([`/patient/${this.form.patientId}`]);
    }
}