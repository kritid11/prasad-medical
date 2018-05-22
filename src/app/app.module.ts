import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { FormsModule } from '@angular/forms';

import { StatusBar } from '@ionic-native/status-bar';
//import { SplashScreen } from '@ionic-native/splash-screen';

import { Facebook } from '@ionic-native/facebook';
import { GooglePlus } from '@ionic-native/google-plus';
import { HttpClientModule } from '@angular/common/http';
import { RestProvider } from '../providers/rest/rest';
import { IonicStorageModule } from '@ionic/storage';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
import { FilePath } from '@ionic-native/file-path';
import { Camera } from '@ionic-native/camera';
import { LaunchNavigator} from '@ionic-native/launch-navigator';
import { GoogleMaps } from "@ionic-native/google-maps";
import { Toast } from '@ionic-native/toast';
import { Geolocation } from '@ionic-native/geolocation';
import { DatePipe } from '@angular/common';
//import { enableProdMode } from '@angular/core';
import { SelectSearchableModule } from 'ionic-select-searchable';

@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
    SelectSearchableModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    IonicStorageModule.forRoot(),
    IonicModule.forRoot(MyApp),
  ],
  //enableProdMode();
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
  ],
  providers: [
    StatusBar,
    //SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    Facebook,
    GooglePlus,
    RestProvider,
    FileTransfer,
    FileTransferObject,
    File,
    FilePath,
    Camera,
    LaunchNavigator,
    GoogleMaps,
    Toast,
    Geolocation,
    DatePipe
  ]
})
export class AppModule {}
