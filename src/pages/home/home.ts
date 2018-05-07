import { Component } from '@angular/core';
import { NavController, IonicPage } from 'ionic-angular';

// import { LoginPage } from '../login/login';
// import { RegisterPage } from '../register/register';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
	  constructor(public navCtrl: NavController) {}

	  goToLogin(){
	     this.navCtrl.push('LoginPage');
	  }

	  goToSignUp(){
	  	this.navCtrl.push('RegisterPage');
	  }

}
