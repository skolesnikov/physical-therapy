import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';

import { IPatient } from '../models/patient';
import { Global } from '../environments/global';

@Injectable()
export class PatientService {
    private baseUrl = `${Global.BASE_API_URL}/Patients`;

    constructor(private http: Http) { }

    getPatients(): Observable<IPatient[]> {
        return this.http.get(this.baseUrl)
            .map((response: Response) => <IPatient[]>response.json())
            .do(data => console.log('getPatients: ' + JSON.stringify(data)))
            .catch(this.handleError);
    }

    getPatient(id: string): Observable<IPatient> {
        const url = `${this.baseUrl}/${id}`;
        return this.http.get(url)
            .map((response: Response) => <IPatient>response.json())
            .do(data => console.log('getPatient: ' + JSON.stringify(data)))
            .catch(this.handleError);
    }

    private handleError(error: Response): Observable<any> {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }
}
