import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
//import { SplashScreen } from '@ionic-native/splash-screen';


import firebase from 'firebase';
import { AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Events } from 'ionic-angular';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any;// = HomePage;
  userName : string;

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform, public statusBar: StatusBar,
              private alertCtrl: AlertController,
              private storage: Storage,
              private events: Events){//, public splashScreen: SplashScreen) {

    this.initializeApp();

    events.subscribe('user:loggedin', (userName) => {
      // user and time are the same arguments passed in `events.publish(user, time)`
        console.log('user:loggedin event subscribe');
        this.userName = userName;
    });

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'New Order', component: 'NewRequestPage' },
      { title: 'About Us', component: 'AboutUsPage' },
      { title: 'Terms and Conditions', component: 'TermsAndConditionsPage' },
      { title: 'Account Details for Payment', component: 'PaymentAccDetailsPage' },
    ];


  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      //this.splashScreen.hide();

      this.storage.get('userName').then((val) => {
        console.log('menu userName', val);
        this.userName = val;
        if(this.userName == "" || this.userName == null || this.userName == undefined){
          this.rootPage = 'SplashPage';
        }else{
          this.rootPage = 'NewRequestPage';
        }
      });

    });

  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario

    this.nav.setRoot(page.component);
  }

  goToMyAccount(){
    this.nav.push('MyAccountPage');
  }

  doLogout(){
    this.presentLogoutConfirm();
  }

  presentLogoutConfirm() {
    let alert = this.alertCtrl.create({
      title: 'Prasad Medical',
      message: 'Do really want to logout?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          handler: () => {
            //console.log('Cancel clicked');
          }
        },
        {
          text: 'Yes',
          handler: () => {
            //console.log('Buy clicked');
            this.storage.remove('userName');
            this.storage.remove('userId');
            this.storage.remove('email');
            this.storage.remove('mobile');

            this.nav.setRoot('HomePage');
          }
        }
      ]
    });
    alert.present();
  };
}
