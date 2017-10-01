import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { IPatient } from '../../models/patient';
import { IForm } from '../../models/form';

import { PatientService } from '../../services/patient.service';
import { FormService } from '../../services/form.service';

@Component({
  templateUrl: './patient.component.html'
})
export class PatientComponent implements OnInit, OnDestroy {
  patient: IPatient;
  forms: IForm[];
  errorMessage: string;
  private sub: Subscription;

  constructor(private route: ActivatedRoute,
                private router: Router,
                private patientService: PatientService,
                private formService: FormService) {
    }

    ngOnInit(): void {
        this.sub = this.route.params.subscribe(
            params => {
                let id = params['id'];
                this.getPatient(id);
                this.getForms(id);
        });
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }

    getPatient(id: string) {
        this.patientService.getPatient(id).subscribe(
            patient => this.patient = patient,
            error => this.errorMessage = <any>error);
    }

    getForms(id) {
        this.formService.getPatientForms(id).subscribe(
            forms => this.forms = forms,
            error => this.errorMessage = <any>error);
    }

    onBack(): void {
        this.router.navigate(['/dashboard']);
    }

    onAdd(formTypeId: number): void {
        if (formTypeId >= 100)
        {
            this.router.navigate([`/form-x-edit/${formTypeId}/0/${this.patient.id}`]);
        }
        else
        {
            this.router.navigate([`/form-${formTypeId}-edit/0/${this.patient.id}`]);
        }        
    }
}
