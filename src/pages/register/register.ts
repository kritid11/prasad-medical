import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import {Validators, FormBuilder, FormGroup } from '@angular/forms';

import { Facebook } from '@ionic-native/facebook';
// import { GooglePlus } from '@ionic-native/google-plus';
// import { Firebase } from '@ionic-native/firebase';
import { LoginPage } from '../login/login';
import { EmailValidator } from '../../validators/email';
import { PasswordMatchValidator } from '../../validators/passwordMatch';

@Component({
  selector: 'page-register',
  templateUrl: 'register.html'
})
export class RegisterPage {
    // firstName: string="";
    // lastName: string="";
    // emailId: string="";
    // mobile: string="";
    // password : string="";

    userProfile: any = null;

    private signupForm : FormGroup;

	  constructor(public navCtrl: NavController, private fb: Facebook,
       //private googlePlus: GooglePlus, private firebase: Firebase,
       private formBuilder: FormBuilder) {

        // this.firebase.auth().onAuthStateChanged( user => {
        // if (user){
        //   this.userProfile = user;
        // } else {
        //     this.userProfile = null;
        // }
        // });

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
        this.navCtrl.push(LoginPage);      

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

    // googleLogin() {
    //   this.googlePlus.login({
    //     'webClientId': '237370195633-sbga5pktq0b3vm7q3jddlu4t7k3qqafl.com.googleusercontent.apps',
    //     'offline': true
    //   }).then( res => {
    //       const googleCredential = this.firebase.auth.GoogleAuthProvider
    //           .credential(res.idToken);
    //
    //       this.firebase.auth().signInWithCredential(googleCredential)
    //       .then( response => {
    //           console.log("Firebase success: " + JSON.stringify(response));
    //       });
    //
    //     }, err => {
    //         console.error("Error: ", err)
    //     });
    // }

}
