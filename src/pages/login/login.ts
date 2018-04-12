import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { Facebook } from '@ionic-native/facebook';
import { GooglePlus } from '@ionic-native/google-plus';
//import { Firebase } from '@ionic-native/firebase';

import {Validators, FormBuilder, FormGroup } from '@angular/forms';
import { EmailOrMobileValidator } from '../../validators/emailOrMobile';

import { NewRequestPage } from '../new-request/new-request';
import { ForgotPasswordPage } from '../forgot-password/forgot-password';

import firebase from 'firebase';


@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

    userProfile: any = null;

    private signinForm : FormGroup;

	  constructor(public navCtrl: NavController, private fb: Facebook,
        private googlePlus: GooglePlus//, private firebase: Firebase
        ,private formBuilder: FormBuilder) {

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
	  }

    doLogin(){
      /**todo: call login service,
      on success go to NewRequest page
      */
      this.navCtrl.setRoot(NewRequestPage);
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
      this.navCtrl.push(ForgotPasswordPage);
    }
}
