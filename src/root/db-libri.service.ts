
import { Injectable } from '@angular/core';
import { Observable, of } from "rxjs";
import { ajax, AjaxResponse } from 'rxjs/ajax';
import { Libro } from './libro';
import { Archivio } from './archivio';
//classi

@Injectable()
export class DbLibriService {
  apiKey: string = "97c4419b"
  URL: string  = 'https://eu-central-1.aws.data.mongodb-api.com/app/kvaas-giwjg/endpoint/';

getData(): Observable<AjaxResponse<any>> {
    return ajax({
      method: 'GET',
      url: this.URL+'get?key='+this.apiKey,
      crossDomain: true,
    });
  }

setData(archivio:Array<Libro>): 
Observable<AjaxResponse<any>> {
    return ajax({
      method: 'POST',
      url: this.URL+'set?key='+this.apiKey,
      crossDomain: true,
      body:JSON.stringify(archivio)
    });
  }
}







