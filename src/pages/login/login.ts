import { Component } from '@angular/core';
import { NavController, IonicPage } from 'ionic-angular';

import { Facebook } from '@ionic-native/facebook';
import { GooglePlus } from '@ionic-native/google-plus';
import { RestProvider } from '../../providers/rest/rest';
import { LoadingController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Events } from 'ionic-angular';

//import { Firebase } from '@ionic-native/firebase';

import {Validators, FormBuilder, FormGroup } from '@angular/forms';
import { EmailOrMobileValidator } from '../../validators/emailOrMobile';

// import { NewRequestPage } from '../new-request/new-request';
// import { ForgotPasswordPage } from '../forgot-password/forgot-password';

import firebase from 'firebase';

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

    private signinForm : FormGroup;

	  constructor(public navCtrl: NavController,
                private fb: Facebook,
                private googlePlus: GooglePlus//, private firebase: Firebase
                ,private formBuilder: FormBuilder,
                public restProvider: RestProvider,
                public loadingCtrl: LoadingController,
                private alertCtrl: AlertController,
                private storage: Storage,
                private events: Events
                ) {

        firebase.auth().onAuthStateChanged( user => {
        if (user){
          this.userProfile = user;
        } else {
            this.userProfile = null;
        }
        });

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

        // this.loading = this.loadingController.create({content : "Logging in, please wait..."});
        // this.loading.present();
        // let TIME_IN_MS = 2000;
    		// setTimeout( () => {
    		//      // somecode
    		//      this.getUsers();
    		// }, TIME_IN_MS);

	  }

    //working demo
    // getUsers() {
    //   this.restProvider.getUsers()
    //   .then(data => {
    //     this.users = data;
    //     console.log(this.users);
    //     this.loading.dismissAll();
    //   });
    // }

    // getUsers() {
    //   this.restProvider.getUsers()
    //   .then(data => {
    //     this.users = data;
    //     console.log(this.users);
    //     //this.loading.dismissAll();
    //   });
    // }

    doLogin(){
      /**todo: call login service,
      on success, save userId got from LoginPage
      and go to NewRequest page
      */

       this.user ={
          "email": this.signinForm.value['emailOrMobile'],
          "password": this.signinForm.value['password']
       };

       let loader = this.loadingCtrl.create({
         content: "Signing in..."
       });
       loader.present();

        this.restProvider.postRequest('/login', this.user).then((result) => {
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

    }

    fbLogin(){
      this.fb.login(['public_profile', 'user_friends', 'email'])
      .then(res => {
        console.log('res',res);
        if(res.status === "connected") {
          //this.isLoggedIn = true;
          //this.getUserDetail(res.authResponse.userID);
          console.log('connected');
        } else {
          //this.isLoggedIn = false;
          console.log('failed');
        }
      })
      .catch(e => console.log('Error logging into Facebook', e));
    }

    googleLogin() {
      this.googlePlus.login({
        'webClientId': '237370195633-sbga5pktq0b3vm7q3jddlu4t7k3qqafl.com.googleusercontent.apps',
        'offline': true
      }).then( res => {
          const googleCredential = firebase.auth.GoogleAuthProvider
              .credential(res.idToken);

          firebase.auth().signInWithCredential(googleCredential)
          .then( response => {
              console.log("Firebase success: " + JSON.stringify(response));
          });

        }, err => {
            console.error("Error: ", err)
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
}
