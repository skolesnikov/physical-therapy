import {  PipeTransform, Pipe } from '@angular/core';
import { IFormType } from '../models/form-type';

@Pipe({
    name: 'formTypeFilter'
})
export class FormTypeFilterPipe implements PipeTransform {

    transform(value: IFormType[], 
        minFormTypeId: number, maxFormTypeId: number): IFormType[] {
        return value ? value.filter((formType: IFormType) =>
            formType.formTypeId >= minFormTypeId && 
            formType.formTypeId <= maxFormTypeId): null;
    }
}