import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';

import { IForm } from '../models/form';
import { Global } from '../environments/global';

@Injectable()
export class FormService {
    
    constructor(private http: Http) { }

    getPatientForms(patientId: string): Observable<IForm[]> {
        return this.http.get(`${Global.BASE_API_URL}/PatientForm/${patientId}`)
            .map(this.extractData)
            .do(data => console.log('getForms: ' + JSON.stringify(data)))
            .catch(this.handleError);
    }

    getNewForm(formTypeId: number, patientId: string): Observable<IForm> {        
        const url = `${Global.BASE_API_URL}/FormDetail/${formTypeId}/${patientId}`;
        return this.http.get(url)
            .map(this.extractData)
            .do(data => console.log('getNewForm: ' + JSON.stringify(data)))
            .catch(this.handleError);
    }

    getForm(id: number): Observable<IForm> {
        const url = `${Global.BASE_API_URL}/FormDetail/${id}`;
        return this.http.get(url)
            .map(this.extractData)
            .do(data => console.log('getForm: ' + JSON.stringify(data)))
            .catch(this.handleError);
    }   

    saveForm(form: IForm): Observable<IForm> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        const url = `${Global.BASE_API_URL}/FormDetail`;
        return this.http.post(url, form, options)
            //.map(() => form)
            .map(this.extractData)
            //.do(data => console.log('saveForm: ' + JSON.stringify(data)))
            .catch(this.handleError);
    }

    deleteForm(id: number): Observable<Response> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        const url = `${Global.BASE_API_URL}/PatientForm/${id}`;
        return this.http.delete(url, options)
            .do(data => console.log('deleteForm: ' + JSON.stringify(data)))
            .catch(this.handleError);
    }

    private extractData(response: Response) {
        //console.log('extractData: ' + JSON.stringify(response.json()));
        return response.json() || {};
    }

    private handleError(error: Response): Observable<any> {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }
}
