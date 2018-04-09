import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { LoginPage } from '../login/login';
import { RegisterPage } from '../register/register';

@Component({
  selector: 'page-new-request',
  templateUrl: 'new-request.html'
})
export class NewRequestPage {

	  afterSplash: boolean = false;
    logo: any;

	  constructor(public navCtrl: NavController) {

      this.logo = 'https://www.shareicon.net/download/2016/10/20/846409_blue_512x512.png';
	  	let TIME_IN_MS = 2000;
  		setTimeout( () => {
  		     // somecode
  		     this.afterSplash=true;
  		}, TIME_IN_MS);
	  }

	  goToLogin(){
	     this.navCtrl.push(LoginPage);
	  }

	  goToSignUp(){
	  	this.navCtrl.push(RegisterPage);
	  }

}
