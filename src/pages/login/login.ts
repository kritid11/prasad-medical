import { Component } from '@angular/core';
import { NavController, IonicPage } from 'ionic-angular';

import { Facebook } from '@ionic-native/facebook';
import { GooglePlus } from '@ionic-native/google-plus';
import { RestProvider } from '../../providers/rest/rest';
import { LoadingController } from 'ionic-angular';
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
    users: any;
    loading : any;

    private signinForm : FormGroup;

	  constructor(public navCtrl: NavController,
                private fb: Facebook,
                private googlePlus: GooglePlus//, private firebase: Firebase
                ,private formBuilder: FormBuilder,
                public restProvider: RestProvider,
                public loadingController: LoadingController,
                private storage: Storage,
                private events: Events) {

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

    getUsers() {
      this.restProvider.getUsers()
      .then(data => {
        this.users = data;
        console.log(this.users);
        this.loading.dismissAll();
      });
    }

    doLogin(){
      /**todo: call login service,
      on success go to NewRequest page
      */
      console.log('form val', this.signinForm.value['emailOrMobile']);
      this.storage.set('userName', this.signinForm.value['emailOrMobile']);
      this.storage.get('userName').then((val) => {
        console.log('storage suserName', val);
        this.events.publish('user:loggedin', val);
      });

      this.navCtrl.setRoot('NewRequestPage');
    }

    fbLogin(){
      this.fb.login(['public_profile', 'user_friends', 'email'])
      .then(res => {
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
}
