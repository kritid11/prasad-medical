import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the SplashPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-splash',
  templateUrl: 'splash.html',
})
export class SplashPage {

  constructor(public navCtrl: NavController,
              public navParams: NavParams) {

    let TIME_IN_MS = 2000;
		setTimeout( () => {
		     // somecode
		     this.navCtrl.push('HomePage');
		}, TIME_IN_MS);
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad SplashPage');
  }

}
