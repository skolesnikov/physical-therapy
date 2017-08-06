import {  PipeTransform, Pipe } from '@angular/core';
import { IForm } from '../models/form';

@Pipe({
    name: 'formFilter'
})
export class FormFilterPipe implements PipeTransform {

    transform(value: IForm[], patientId: string): IForm[] {
        return value ? value.filter((form: IForm) =>
            form.patientId === patientId):  null;
    }
}