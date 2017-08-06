import {  PipeTransform, Pipe } from '@angular/core';
import { IPatient } from '../models/patient';

@Pipe({
    name: 'patientFilter'
})
export class PatientFilterPipe implements PipeTransform {

    transform(value: IPatient[], filterBy: string): IPatient[] {
        filterBy = filterBy ? filterBy.toLocaleLowerCase() : null;
        return filterBy ? value.filter((patient: IPatient) =>
            patient.firstName.toLocaleLowerCase().indexOf(filterBy) !== -1 ||
            patient.lastName.toLocaleLowerCase().indexOf(filterBy) !== -1) : value;
    }
}