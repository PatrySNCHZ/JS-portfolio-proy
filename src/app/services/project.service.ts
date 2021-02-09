import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Project } from '../models/project';
import { global } from './global';

@Injectable()
export class ProjectService{
    public url:string;

    constructor(
        private _http: HttpClient
    ){
        this.url = global.url;
    }

    testService(){
        return "Probando el servicio";
    }

    saveProject(project: Project): Observable<any>{

        // convertir a JSON
        let params = JSON.stringify(project);
        // establecer los headers
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        
        // petición por post
        return this._http.post(this.url+'save-project', params, {headers: headers});

    }

    getProjects(): Observable<any> {
        let headers = new HttpHeaders().set('Content-Type', 'application/json');

        return this._http.get(this.url+'projects', {headers: headers});

    }

    getProject(id: any): Observable<any>{
        let headers = new HttpHeaders().set('Content-Type', 'application/json');

        return this._http.get(this.url+'project/'+id, {headers: headers});
    
    }

    deleteProject(id: any): Observable<any>{
        let headers = new HttpHeaders().set('Content-Type', 'application/json');

        return this._http.delete(this.url+'delete-project/'+id, {headers: headers});

    }

    editProject(project: any): Observable<any>{
        let params = JSON.stringify(project);
        let headers = new HttpHeaders().set('Content-Type', 'application/json');

        return this._http.put(this.url+'update-project/'+project._id, params, {headers: headers});
    }


}