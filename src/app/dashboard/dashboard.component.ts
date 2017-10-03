import { Component, OnInit } from '@angular/core';
import { IPatient } from '../../models/patient';
import { PatientService } from '../../services/patient.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {

  listFilter: string;
    errorMessage: string;

    patients: IPatient[];

    constructor(private patientService: PatientService) {

    }

    ngOnInit(): void {
        this.patientService.getPatients()
                .subscribe(patients => this.patients = patients,
                           error => this.errorMessage = <any>error);
    }

}