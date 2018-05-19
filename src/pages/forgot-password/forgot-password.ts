import { Component } from '@angular/core';
import { NavController, IonicPage } from 'ionic-angular';

//import { LoginPage } from '../login/login';

import {Validators, FormBuilder, FormGroup } from '@angular/forms';
import { EmailOrMobileValidator } from '../../validators/emailOrMobile';
import { RestProvider } from '../../providers/rest/rest';
import { LoadingController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-forgot-password',
  templateUrl: 'forgot-password.html'
})
export class ForgotPasswordPage {

    private forgotPasswordForm : FormGroup;
    action: string = 'none';
    user: any;
    result: any;

	  constructor(public navCtrl: NavController,
                private formBuilder: FormBuilder,
                public restProvider: RestProvider,
                public loadingCtrl: LoadingController,
                private alertCtrl: AlertController) {

        this.forgotPasswordForm = this.formBuilder.group({
          emailOrMobile: [
            '',
            Validators.compose([Validators.required, EmailOrMobileValidator.isValid, ])
          ]
        });
	  }

    forgotPassword(){
      /**todo call forgotPassword service,
      on success go to login page
      */
      this.user ={
         "email": this.forgotPasswordForm.value['emailOrMobile']
      };

      let loader = this.loadingCtrl.create({
        content: "Sending new password to your registered Email id..."
      });
      loader.present();

       this.restProvider.postRequest('/forgotPassword', this.user).then((result) => {
         loader.dismiss();
         console.log(result);
           this.result = result;

           if(this.result.statusKey == 200){
             this.action = 'onSuccess';
             //this.presentAlert(this.result.message);
             this.presentAlert('A new password has been sent to your registered email id.');
           }else if(this.result.statusKey == 400){
             this.action = 'none';
             this.presentAlert(this.result.message);
           }else{
             this.action = 'none';
             this.presentAlert('Something went wrong.. Please try again.');
           }

       }, (err) => {
         loader.dismiss();
         console.log(err);
         this.presentAlert('Something went wrong.. Please try again.');
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
              if(this.action == 'onSuccess'){
                this.navCtrl.pop();
              }
              //console.log('Cancel clicked');
            }
          }
        ]
      });
      alert.present();
    };
}
