import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { RestProvider } from '../../providers/rest/rest';
import { LoadingController } from 'ionic-angular';
import { EmailValidator } from '../../validators/email';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';

@IonicPage()
@Component({
  selector: 'page-another-address',
  templateUrl: 'another-address.html',
})

export class AnotherAddressPage {

  result: any;
  order: any;
  private addressForm : FormGroup;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private alertCtrl: AlertController,
              private storage: Storage,
              public restProvider: RestProvider,
              public loadingCtrl: LoadingController,
              private formBuilder: FormBuilder) {

                this.addressForm = this.formBuilder.group({
                  email: [
                    '',
                    Validators.compose([ Validators.required, EmailValidator.isValid ])
                  ],
                  mobile: [
                    '',
                    Validators.compose(
                              [Validators.maxLength(10),
                              Validators.minLength(10),
                              Validators.required]
                        )
                  ],
                  addressType: [
                    '',
                    Validators.compose([ Validators.required])
                  ],
                  street: [
                    '',
                    Validators.compose([ Validators.required])
                  ],
                  city: [
                    '',
                    Validators.compose([ Validators.required])
                  ],
                  pincode: [
                    '',
                    Validators.compose(
                              [Validators.maxLength(6),
                              Validators.minLength(6),
                              Validators.required]
                        )
                  ],
                  state: ['Maharashtra'],
                  country: ['India']
                });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DeliveryAddressPage');
  }

  deliverToThisAddress(){
    this.callPlaceOrderApi();
  }

  callPlaceOrderApi(){
    this.storage.get('pxIdArray').then((val) => {
      console.log('storage pxIdArray', val);

      this.storage.get('itemsArray').then((val1) => {
        console.log('storage itemsArray', val1);

        this.storage.get('userId').then((val2) => {
          console.log('storage userId', val2);

          //mode is pickup here, address will b blank

          this.order ={
             "user_id" : val2,
             "prescription_array" : val,
             "items_array" : val1,
             "mode" : "d",
             "address":{
               "nickname": this.addressForm.value['addressType'],
               "street": this.addressForm.value['street'],
               "city": this.addressForm.value['city'],
               "pincode": this.addressForm.value['pincode']
             },
             "email" : this.addressForm.value['email'],
             "mobile" : this.addressForm.value['mobile']
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
}

getAddress() {
    this.storage.get('userId').then((val) => {

      console.log('storage userId', val);
      let loader = this.loadingCtrl.create({
        content: "getting Address..."
      });
      loader.present();

      this.restProvider.getRequest('/getAddress', '/' + val)
      .then((result) => {
        loader.dismiss();
        console.log(result);
        this.result = result;
        if(this.result.statusKey == 200){
          this.result = result;
          this.addressForm.controls['email'].setValue(this.result.data.email);
          this.addressForm.controls['mobile'].setValue(this.result.data.mobile);
          this.addressForm.controls['addressType'].setValue(this.result.data.address.nickname);
          this.addressForm.controls['street'].setValue(this.result.data.address.street);
          this.addressForm.controls['city'].setValue(this.result.data.address.city);
          this.addressForm.controls['state'].setValue(this.result.data.address.state);
          this.addressForm.controls['pincode'].setValue(this.result.data.address.pincode);

        }else if(this.result.statusKey == 400){
            this.presentAlert(this.result.message);
        }else{
            this.presentAlert('Something went wrong.. Please try again.');
        }
    },(err) => {
       loader.dismiss();
       console.log(err);
       this.presentAlert('Something went wrong.. Please try again.');
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
