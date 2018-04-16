import { Component } from '@angular/core';
import { NavController, IonicPage } from 'ionic-angular';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';

import { Facebook } from '@ionic-native/facebook';
// import { GooglePlus } from '@ionic-native/google-plus';
// import { Firebase } from '@ionic-native/firebase';

//import { LoginPage } from '../login/login';

import { EmailValidator } from '../../validators/email';
import { PasswordMatchValidator } from '../../validators/passwordMatch';

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html'
})
export class RegisterPage {
    firstName: string = "";
    lastName: string = "";
    emailId: string = "";
    mobile: string = "";
    password : string = "";
    confirmPassword: string = "";

    userProfile: any = null;

    private signupForm : FormGroup;

	  constructor(public navCtrl: NavController, private fb: Facebook,
       private formBuilder: FormBuilder) {

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
      // this.firstName = this.signinForm.value['firstName'];
      // this.lastName = this.signinForm.value['lastName'];
      // this.email = this.signinForm.value['email'];
      // this.mobile = this.signinForm.value['mobile'];
      // this.password = this.signinForm.value['password'];
      // this.confirmPassword = this.signinForm.value['confirmPassword'];
      this.navCtrl.push('LoginPage');

    }

}
