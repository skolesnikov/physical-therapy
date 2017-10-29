import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';

import { IFormType } from '../models/form-type';
import { Global } from '../environments/global';

@Injectable()
export class FormTypeService {
    
    constructor(private http: Http) { }

    getFormTypes(): Observable<IFormType[]> {
        return this.http.get(`${Global.BASE_API_URL}/FormType`)
            .map((response: Response) => <IFormType[]>response.json())
            .do(data => console.log('getFormTypes: ' + JSON.stringify(data)))
            .catch(this.handleError);
    }

    private handleError(error: Response): Observable<any> {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }
}
