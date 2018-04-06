import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { LoginPage } from '../login/login';
import { ListPage } from '../list/list';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

	  afterSplash: boolean = false; 

	  constructor(public navCtrl: NavController) {

	  	let TIME_IN_MS = 2000;
		let hideFooterTimeout = setTimeout( () => {
		     // somecode
		     this.afterSplash=true;
		}, TIME_IN_MS);
	  }

	  goToLogin(){
	    this.navCtrl.push(LoginPage);
	  }

	  goToSignUp(){
	  	this.navCtrl.push(ListPage);
	  }

}
