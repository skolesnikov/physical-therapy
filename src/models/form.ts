import { IQuestion } from './question';

export interface IForm {
    id: number;
    formTypeId: number;
    formTypeName: string;
    patientId: string;
    formDate: Date;
    questions: Array<IQuestion>
}