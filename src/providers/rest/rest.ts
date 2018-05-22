import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { HttpParams } from '@angular/common/http';

/*
  Generated class for the RestProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class RestProvider {
  //apiUrl = 'https://jsonplaceholder.typicode.com';
  apiUrl = 'https://2c2a7353.ngrok.io/prasad-medical/public';

  constructor(public http: HttpClient) {
    console.log('Hello RestProvider Provider');
  }

  getRequest(api, params) {
    console.log(this.apiUrl + api + params);
    return new Promise(resolve => {
      this.http.get(this.apiUrl + api + params).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }

  postRequest(api, data) {
    console.log("api",this.apiUrl + api);
    console.log("params",JSON.stringify(data));
    return new Promise((resolve, reject) => {
      this.http.post(this.apiUrl + api, JSON.stringify(data),
        {
          //headers: new HttpHeaders().set('Authorization', 'my-auth-token'),
          //params: new HttpParams().set('id', '3'),
        })
        .subscribe(res => {
          console.log('rest resolve');
          resolve(res);
        }, (err) => {
          console.log('rest reject');
          reject(err);
        });
    });
  }

}
