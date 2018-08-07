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
  //baseURL = 'https://jsonplaceholder.typicode.com';
  baseURL = 'https://4cb6efad.ngrok.io/prasad-medical/public';
  key : string = "O1TTBiVD";//"gtKFFx";
  salt : string = "qp1B4zZt2W";//"eCwWELxi";
  sandboxUrl: string = 'https://sandboxsecure.payu.in/_payment';
  productionUrl: string = 'https://secure.payu.in/_payment';
  service_provider : string = "payu_paisa";

  constructor(public http: HttpClient) {
    //console.log('Hello RestProvider Provider');
  }

  getBaseUrl(){
     return this.baseURL;
  }

  getKey(){
     return this.key;
  }

  getSalt(){
     return this.salt;
  }

  getSandboxUrl(){
     return this.sandboxUrl;
  }

  getProductionUrl(){
     return this.productionUrl;
  }

  getServiceProvider(){
     return this.service_provider;
  }

  getUniqueTxnId(){
      // Math.random should be unique because of its seeding algorithm.
      // Convert it to base 36 (numbers + letters), and grab the first 9 characters
      // after the decimal.
      return '_' + Math.random().toString(36).substr(2, 9);
  }

  getRequest(api, params) {
    console.log(this.baseURL + api + params);
    return new Promise(resolve => {
      this.http.get(this.baseURL + api + params).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }

  postRequest(api, data) {
    console.log("api",this.baseURL + api);
    console.log("params",JSON.stringify(data));
    return new Promise((resolve, reject) => {
      this.http.post(this.baseURL + api, JSON.stringify(data),
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
