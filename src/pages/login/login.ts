import { Component } from '@angular/core';
import { NavController, IonicPage } from 'ionic-angular';

import { Facebook } from '@ionic-native/facebook';
import { RestProvider } from '../../providers/rest/rest';
import { LoadingController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Events } from 'ionic-angular';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';
import { EmailOrMobileValidator } from '../../validators/emailOrMobile';
import { GooglePlus } from '@ionic-native/google-plus';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

    userProfile: any = null;
    user: any;
    loading : any;
    result: any;
    name : Array<string> = [];

    private signinForm : FormGroup;

	  constructor(public navCtrl: NavController,
                private fb: Facebook,
                private formBuilder: FormBuilder,
                public restProvider: RestProvider,
                public loadingCtrl: LoadingController,
                private alertCtrl: AlertController,
                private storage: Storage,
                private events: Events,
                private googlePlus: GooglePlus
                ) {

        this.signinForm = this.formBuilder.group({
          emailOrMobile: [
            '',
            Validators.compose([Validators.required, EmailOrMobileValidator.isValid, ])
          ],
          password: [
            '',
            Validators.compose([Validators.required])
          ]
        });

	  }

    doGoogleLogin(){
      this.googlePlus.login({})
      .then(res => {
        console.log('google: ',res);

        this.user ={
              "name"  : res.displayName,
              "email" : res.email,
              "provider" : "google"
        };

        this.callSocialLoginApi();

      })
      .catch(err => console.error('google: ',err));
    }

    doGoogleLogout() {
      this.googlePlus.logout()
        .then(res => {
          console.log('google: ',res);
        })
        .catch(err => console.error('google: ',err));
    }

    doLogin(){

       this.user ={
          "email": this.signinForm.value['emailOrMobile'],
          "password": this.signinForm.value['password']
       };

       this.callLoginApi();
    }

    fbLogin(){
      this.fb.login(['public_profile', 'email'])
      .then(res => {
        console.log('fb res: ',res);
        if(res.status === "connected") {
          //this.isLoggedIn = true;
          this.getUserDetail(res.authResponse.userID);
          console.log('connected');
        } else {
          //this.isLoggedIn = false;
          console.log('failed');
        }
      })
      .catch(e => console.log('Error logging into Facebook', e));
    }

    getUserDetail(userid) {
      this.fb.api("/"+userid+"/?fields=id,email,name,picture,gender",["public_profile"])
        .then(res => {
          console.log(res);
          this.user ={
                "name"  : res.name,
                "email": res.email,
                "provider": "facebook"
          };

          this.callSocialLoginApi();
        })
        .catch(e => {
          console.log(e);
        });
    }

    goToForgotPassword(){
      /**todo call forgotPassword service,
      on success go to login page
      */
      this.navCtrl.push('ForgotPasswordPage');
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

    callLoginApi(){
      let loader = this.loadingCtrl.create({
        content: "Signing in..."
      });
      loader.present();

       this.restProvider.postRequest("/login", this.user).then((result) => {
         loader.dismiss();
         console.log(result);
           this.result = result;

           if(this.result.statusKey == 200){
             //console.log('form val', result.username);
             this.storage.set('userName', this.result.data.first_name + " " + this.result.data.last_name);
             this.storage.set('userId', this.result.data.id);
             this.storage.get('userName').then((val) => {
               console.log('storage suserName', val);
               this.events.publish('user:loggedin', val);
             });
             this.storage.set('email', this.result.data.email);
             this.storage.set('mobile', this.result.data.mobile);
             this.navCtrl.setRoot('NewRequestPage');
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

       if(this.user.provider == 'google'){
         this.doGoogleLogout();
       }
    }

    callSocialLoginApi(){
      let loader = this.loadingCtrl.create({
        content: "Signing in..."
      });
      loader.present();

       this.restProvider.postRequest("/socialLogin", this.user).then((result) => {
         loader.dismiss();
         console.log(result);
           this.result = result;

           if(this.result.statusKey == 200){
             //console.log('form val', result.username);
             this.storage.set('userName', this.result.data.first_name + " " + this.result.data.last_name);
             this.storage.set('userId', this.result.data.id);
             this.storage.get('userName').then((val) => {
               console.log('storage suserName', val);
               this.events.publish('user:loggedin', val);
             });
             this.storage.set('email', this.result.data.email);
             this.storage.set('mobile', this.result.data.mobile);
             this.navCtrl.setRoot('NewRequestPage');
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

       if(this.user.provider == 'google'){
         this.doGoogleLogout();
       }
    }

}
