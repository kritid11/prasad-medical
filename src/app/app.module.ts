import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { FormsModule } from '@angular/forms';
// import { HomePage } from '../pages/home/home';
// import { RegisterPage } from '../pages/register/register';
// import { LoginPage } from '../pages/login/login';
// import { ForgotPasswordPage } from '../pages/forgot-password/forgot-password';
// import { NewRequestPage } from '../pages/new-request/new-request';
// import { AboutUsPage } from '../pages/about-us/about-us';
// import { TermsAndConditionsPage } from '../pages/terms-and-conditions/terms-and-conditions';
// import { PaymentAccDetailsPage } from '../pages/payment-acc-details/payment-acc-details';
// import { MyAccountPage } from '../pages/my-account/my-account';
// import { AddPrescriptionPage } from '../pages/add-prescription/add-prescription';
// import { AddItemPage } from '../pages/add-item/add-item';
// import { SelectModePage } from '../pages/select-mode/select-mode';

import { StatusBar } from '@ionic-native/status-bar';
//import { SplashScreen } from '@ionic-native/splash-screen';

import { Facebook } from '@ionic-native/facebook';
import { GooglePlus } from '@ionic-native/google-plus';
import { HttpClientModule } from '@angular/common/http';
import { RestProvider } from '../providers/rest/rest';
import { IonicStorageModule } from '@ionic/storage';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
import { Camera } from '@ionic-native/camera';
import { LaunchNavigator} from '@ionic-native/launch-navigator';
import { GoogleMaps } from "@ionic-native/google-maps";


@NgModule({
  declarations: [
    MyApp
    // HomePage,
    // RegisterPage,
    // LoginPage,
    // ForgotPasswordPage,
    // NewRequestPage,
    // AboutUsPage,
    // TermsAndConditionsPage,
    // PaymentAccDetailsPage,
    // MyAccountPage,
    // AddPrescriptionPage,
    // AddItemPage,
    // SelectModePage
    // ConfirmOrderPage

  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    IonicStorageModule.forRoot(),
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
    // HomePage,
    // RegisterPage,
    // LoginPage,
    // ForgotPasswordPage,
    // NewRequestPage,
    // AboutUsPage,
    // TermsAndConditionsPage,
    // PaymentAccDetailsPage,
    // MyAccountPage,
    // AddPrescriptionPage,
    // AddItemPage,
    // SelectModePage
    // ConfirmOrderPage
  ],
  providers: [
    StatusBar,
    //SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    [Facebook, GooglePlus],
    RestProvider,
    FileTransfer,
    FileTransferObject,
    File,
    Camera,
    LaunchNavigator,
    GoogleMaps
  ]
})
export class AppModule {}
