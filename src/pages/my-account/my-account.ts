import { Component } from '@angular/core';
import { NavController, IonicPage } from 'ionic-angular';

import {Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Storage } from '@ionic/storage';
import { RestProvider } from '../../providers/rest/rest';

import { LoadingController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { Toast } from '@ionic-native/toast';

@IonicPage()
@Component({
  selector: 'page-my-account',
  templateUrl: 'my-account.html'
})
export class MyAccountPage {

    private accountForm : FormGroup;
    result : any;
    data : any;

	  constructor(public navCtrl: NavController,
                private formBuilder: FormBuilder,
                private storage: Storage,
                public restProvider: RestProvider,
                public loadingCtrl: LoadingController,
                private alertCtrl: AlertController,
                private toast: Toast) {

         //call getAccountDetails
         this.getAccountDetails();

        this.accountForm = this.formBuilder.group({
          firstName: [
            '',
            Validators.compose(
                      [Validators.maxLength(30),
                      Validators.pattern('[a-zA-Z ]*'),
                      Validators.required]
                )
          ],
          lastName: [
            '',
            Validators.compose(
                      [Validators.maxLength(30),
                      Validators.pattern('[a-zA-Z ]*'),
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
          state: [
            'Maharashtra',
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
          email : [''],
          mobile: [
            '',
            Validators.compose(
                      [Validators.maxLength(10),
                      Validators.minLength(10),
                      Validators.required]
                )
          ]
        });
    }


    updateAccountDetails(){
      /**todo call updateAccount service,
      on success go to NewRequestPage
      */
      this.storage.get('userId').then((val) => {
          console.log('storage userId', val);

          this.data ={
            "user_id" : val,
             "first_name": this.accountForm.value['firstName'],
             "last_name": this.accountForm.value['lastName'],
             "mobile"  : this.accountForm.value['mobile'],
             "address":{
               "nickname": this.accountForm.value['addressType'],
               "street": this.accountForm.value['street'],
               "city": this.accountForm.value['city'],
               "pincode": this.accountForm.value['pincode']
             }
          }

          let loader = this.loadingCtrl.create({
            content: "Updating details..."
          });
          loader.present();

           this.restProvider.postRequest('/setAccountDetails', this.data).then((result) => {
             loader.dismiss();
             console.log(result);
               this.result = result;

               if(this.result.statusKey == 200){
                 this.storage.set('mobile', this.accountForm.value['mobile']);
                 this.presentToast(this.result.message);
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

    }

    getAccountDetails() {
      this.storage.get('userId').then((val) => {

        console.log('storage userId', val);
        let loader = this.loadingCtrl.create({
          content: "getting Acccount Details.."
        });
        loader.present();

        this.restProvider.getRequest('/getAccountDetails', '/' + val)
        .then((result) => {
          loader.dismiss();
          console.log(result);
          this.result = result;
          if(this.result.statusKey == 200){
            this.result = result;
            this.accountForm.controls['firstName'].setValue(this.result.data.first_name);
            this.accountForm.controls['lastName'].setValue(this.result.data.last_name);
            this.accountForm.controls['addressType'].setValue(this.result.data.address.nickname);
            this.accountForm.controls['street'].setValue(this.result.data.address.street);
            this.accountForm.controls['city'].setValue(this.result.data.address.city);
            this.accountForm.controls['state'].setValue(this.result.data.address.state);
            this.accountForm.controls['pincode'].setValue(this.result.data.address.pincode);
            this.accountForm.controls['email'].setValue(this.result.data.email);
            this.accountForm.controls['mobile'].setValue(this.result.data.mobile);

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
  };

  presentToast(msg){
    this.toast.show(msg, '3000', 'bottom').subscribe(
       toast => {
         console.log(toast);
       }
     );
  }

}
