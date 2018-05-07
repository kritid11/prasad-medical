import { Component } from '@angular/core';
import { NavController, IonicPage } from 'ionic-angular';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';

import { Facebook } from '@ionic-native/facebook';
// import { GooglePlus } from '@ionic-native/google-plus';
// import { Firebase } from '@ionic-native/firebase';
import { AlertController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';

import { EmailValidator } from '../../validators/email';
import { PasswordMatchValidator } from '../../validators/passwordMatch';

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html'
})
export class RegisterPage {

    result: any;
    user: any;

    private signupForm : FormGroup;

	  constructor(public navCtrl: NavController,
                private fb: Facebook,
                private formBuilder: FormBuilder,
                public restProvider: RestProvider,
                public loadingCtrl: LoadingController,
                private alertCtrl: AlertController) {

        this.signupForm = this.formBuilder.group({
          email: [
            '',
            Validators.compose([ Validators.required, EmailValidator.isValid ])
          ],
          'passwords': this.formBuilder.group({
            password: ['', Validators.required],
            confirmPassword: ['', Validators.required]
          }, {validator: PasswordMatchValidator.isMatching}),
          password: [
            '',
            Validators.compose([ Validators.required, Validators.minLength(6)])
          ],
          confirmPassword: [
            '',
            Validators.compose([ Validators.required, Validators.minLength(6)])
          ],
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


    registerUser(){
      /**todo call register service,
      on success go to login page
      */

      this.user ={
            "first_name": this.signupForm.value['firstName'],
            "last_name": this.signupForm.value['lastName'],
            "email": this.signupForm.value['email'],
            "password": this.signupForm.value['password'],
            "provider": "system",
            "mobile": this.signupForm.value['mobile']
      };


      let loader = this.loadingCtrl.create({
        content: "Signing up..."
      });
      loader.present();

     this.restProvider.postRequest('/signup', this.user).then((result) => {
       loader.dismiss();
       console.log(result);
         this.result = result;

         if(this.result.statusKey == 200){
           this.navCtrl.setRoot('LoginPage');
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
  };

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
}
