import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { RegisterPage } from '../pages/register/register';
import { LoginPage } from '../pages/login/login';
import { ForgotPasswordPage } from '../pages/forgot-password/forgot-password';
import { NewRequestPage } from '../pages/new-request/new-request';
import { AboutUsPage } from '../pages/about-us/about-us';
import { TermsAndConditionsPage } from '../pages/terms-and-conditions/terms-and-conditions';
import { PaymentAccDetailsPage } from '../pages/payment-acc-details/payment-acc-details';
import { MyAccountPage } from '../pages/my-account/my-account';

import { StatusBar } from '@ionic-native/status-bar';
//import { SplashScreen } from '@ionic-native/splash-screen';

import { Facebook } from '@ionic-native/facebook';
import { GooglePlus } from '@ionic-native/google-plus';


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    RegisterPage,
    LoginPage,
    ForgotPasswordPage,
    NewRequestPage,
    AboutUsPage,
    TermsAndConditionsPage,
    PaymentAccDetailsPage,
    MyAccountPage

  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    RegisterPage,
    LoginPage,
    ForgotPasswordPage,
    NewRequestPage,
    AboutUsPage,
    TermsAndConditionsPage,
    PaymentAccDetailsPage,
    MyAccountPage
  ],
  providers: [
    StatusBar,
    //SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    [Facebook, GooglePlus]
  ]
})
export class AppModule {}
