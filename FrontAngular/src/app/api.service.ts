import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class ApiService {
 urlBase = "http://localhost:60784/";

  constructor(private http : HttpClient) { }

  get = (url) => {
return this.http.get(this.urlBase + url);
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
}
