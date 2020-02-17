import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable()
export class ApiService {
 urlBase = "http://localhost:60784/";
 observableAddImages : Subject<any> = new Subject<any>();
 observableFavoris : Subject<any> = new Subject<any>();
 observableUpdate : Subject<any> = new Subject<any>();
  constructor(private http : HttpClient) { }

  get = (url) => {
return this.http.get(this.urlBase + url);
  }

  put = (url,data) => {
    const headers = new HttpHeaders({
      "Accept": "application/json",
    });
    return this.http.put(this.urlBase + url,data, {headers : headers});
  }

  post = (url, data) => {
    const headers = new HttpHeaders({
    
      "content-type": "application/json"
 
    });
    return this.http.post(this.urlBase + url, data, { headers: headers} )
  }

  upload = (url, formdata) => {

    const headers = new HttpHeaders({
    
      "Accept": "application/json"
 
    });
    return this.http.put(this.urlBase +  url, formdata, { headers: headers});
  }

  delete = (url) => {

    return this.http.delete(this.urlBase + url)
  }


}
