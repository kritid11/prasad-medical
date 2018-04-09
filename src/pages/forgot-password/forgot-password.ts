import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { LoginPage } from '../login/login';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';
import { EmailOrMobileValidator } from '../../validators/emailOrMobile';

@Component({
  selector: 'page-forgot-password',
  templateUrl: 'forgot-password.html'
})
export class ForgotPasswordPage {

    private forgotPasswordForm : FormGroup;

	  constructor(public navCtrl: NavController, private formBuilder: FormBuilder) {

        this.forgotPasswordForm = this.formBuilder.group({
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

    forgotPassword(){
      /**todo call forgotPassword service,
      on success go to login page
      */
      this.navCtrl.push(LoginPage);
    }
}
