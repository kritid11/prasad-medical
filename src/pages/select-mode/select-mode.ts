import { Component } from '@angular/core';
import { NavController, IonicPage } from 'ionic-angular';

import { AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { RestProvider } from '../../providers/rest/rest';
import { LoadingController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-select-mode',
  templateUrl: 'select-mode.html'
})
export class SelectModePage {

  result : any;
  order :  any;

	  constructor(public navCtrl: NavController,
                private alertCtrl: AlertController,
                private storage: Storage,
                public restProvider: RestProvider,
                public loadingCtrl: LoadingController) {

                }

    gotToConfirmOrder(){
      this.presentPickupConfirm();
    }

    goToSetAddress(){
      this.navCtrl.push('DeliveryAddressPage');
    }

    goToTermsAndConditionsPage(){
      this.navCtrl.push('TermsAndConditionsPage');
    }

    presentPickupConfirm() {
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
              this.callPlaceOrderApi();
            }
          }
        ]
      });
      alert.present();
    };

    callPlaceOrderApi(){
      this.storage.get('pxIdArray').then((val) => {
        console.log('storage pxIdArray', val);

        this.storage.get('itemsArray').then((val1) => {
          console.log('storage itemsArray', val1);

          this.storage.get('userId').then((val2) => {
            console.log('storage userId', val2);

            this.storage.get('email').then((val3) => {
              console.log('storage email', val3);

              this.storage.get('mobile').then((val4) => {
              console.log('storage mobile', val4);
                //mode is pickup here, address will b blank
                this.order ={
                   "prescription_array" : val,
                   "items_array" : val1,
                   "user_id" : val2,
                   "mode" : "p",
                   "address" : null,
                   "email"  : val3,
                   "mobile" : val4
                };

                let loader = this.loadingCtrl.create({
                  content: "Placing your order..."
                });
                loader.present();

               this.restProvider.postRequest('/placeOrder', this.order).then((result) => {
                 loader.dismiss();
                 console.log(result);
                   this.result = result;

                   if(this.result.statusKey == 200){
                     this.storage.remove('pxIdArray');
                     this.storage.remove('smallImgs');
                     this.storage.remove('itemsArray');
                     this.navCtrl.setRoot('ConfirmOrderPage');
                   }else if(this.result.statusKey == 400){
                     this.presentAlert(this.result.message);
                   }else{
                     this.presentAlert('Something went wrong.. Please try again.');
                   }

               }, (err) => {
                 loader.dismiss();
                 console.log(err);
                 this.presentAlert('Something went wrong.. Please try again.');
               });
            });
          });
        });
      });
    });
  }


  presentAlert(msg) {
    let alert = this.alertCtrl.create({
      title: 'Prasad Medical',
      message: msg,
      buttons: [
        {
          text: 'Ok',
          role: 'cancel',
          handler: () => {
            //console.log('Cancel clicked');
          }
        }
      ]
    });
    alert.present();
  }
}
