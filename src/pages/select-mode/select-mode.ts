import { Component } from '@angular/core';
import { NavController, IonicPage } from 'ionic-angular';

import { AlertController } from 'ionic-angular';

//import { ConfirmOrderPage } from '../confirm-order/confirm-order';
//import { TermsAndConditionsPage } from '../terms-and-conditions/terms-and-conditions';

@IonicPage()
@Component({
  selector: 'page-select-mode',
  templateUrl: 'select-mode.html'
})
export class SelectModePage {
	  constructor(public navCtrl: NavController, private alertCtrl: AlertController) {}

    gotToConfirmOrder(){
      this.presentpickupConfirm();
    }

    goToSetAddress(){
      //this.navCtrl.push(AddItemPage);
    }

    goToTermsAndConditionsPage(){
      this.navCtrl.push('TermsAndConditionsPage');
    }

    presentpickupConfirm() {
      let alert = this.alertCtrl.create({
        title: 'Prasad Medical',
        message: 'Are you sure you want to pickup the medicines?',
        buttons: [
          {
            text: 'No',
            role: 'cancel',
            handler: () => {
              //console.log('Cancel clicked');
            }
          },
          {
            text: 'Yes',
            handler: () => {
              //console.log('Buy clicked');
              this.navCtrl.setRoot('ConfirmOrderPage');
            }
          }
        ]
      });
      alert.present();
    };

}
