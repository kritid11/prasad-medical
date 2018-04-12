import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
//import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { NewRequestPage } from '../pages/new-request/new-request';
import { AboutUsPage } from '../pages/about-us/about-us';
import { TermsAndConditionsPage } from '../pages/terms-and-conditions/terms-and-conditions';
import { PaymentAccDetailsPage } from '../pages/payment-acc-details/payment-acc-details';
import { MyAccountPage } from '../pages/my-account/my-account';

import firebase from 'firebase';



const config = {
  apiKey: 'AIzaSyAL8QGw8wVJ4bVbIJJzqxXc8uOLqs3rSXE',
  //authDomain: 'YOUR_AUTH_DOMAIN',
  projectId: 'prasad-medical-200413'
};

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform, public statusBar: StatusBar){//, public splashScreen: SplashScreen) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'New Order', component: NewRequestPage },
      { title: 'About Us', component: AboutUsPage },
      { title: 'Terms and Conditions', component: TermsAndConditionsPage },
      { title: 'Account Details for Payment', component: PaymentAccDetailsPage },
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      //this.splashScreen.hide();

    });
    firebase.initializeApp(config);
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

  goToMyAccount(){
    this.nav.push(MyAccountPage);
  }

  doLogout(){
    this.nav.setRoot(HomePage);
  }
}
