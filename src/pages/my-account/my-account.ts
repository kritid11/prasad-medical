import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import {Validators, FormBuilder, FormGroup } from '@angular/forms';

import { NewRequestPage } from '../new-request/new-request';

@Component({
  selector: 'page-my-account',
  templateUrl: 'my-account.html'
})
export class MyAccountPage {

    private accountForm : FormGroup;
    private userMobile : string;
    private userEmail : string;

	  constructor(public navCtrl: NavController,
       private formBuilder: FormBuilder) {

         this.userEmail = "kritid11@gmail.com";
         this.userMobile = "8600273356";

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
          flat: [
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
            '',
            Validators.compose([ Validators.required])
          ],
        });
    }


    updateAccountDetails(){
      /**todo call updateAccount service,
      on success go to NewRequestPage
      */
        this.navCtrl.setRoot(NewRequestPage);

    }

}
