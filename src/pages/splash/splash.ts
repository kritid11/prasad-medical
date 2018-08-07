import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { AlertController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';

/**
 * Generated class for the SplashPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-splash',
  templateUrl: 'splash.html',
})
export class SplashPage {

  items : Array<any> = [];
  result : any;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private storage: Storage,
              private alertCtrl: AlertController,
              public loadingCtrl: LoadingController,
            public restProvider: RestProvider) {

    // let TIME_IN_MS = 2000;
		// setTimeout( () => {
		//      // somecode
		//      this.navCtrl.push('HomePage');
		// }, TIME_IN_MS);

    this.storage.get('masterItemsArray').then((val) => {
        console.log('from storage masterItemsArray', val);
        if(val == null || val == undefined){
          this.callSearchMedicines();
        }else{
          this.navCtrl.push('HomePage');
        }
    });

  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad SplashPage');
  }

  callSearchMedicines(){

      let loader = this.loadingCtrl.create({
        content: "Loading... Please wait"
      });
      loader.present();

      this.restProvider.getRequest('/searchMedicines', '')
      .then((result) => {
        loader.dismiss();
        console.log(result);
        this.result = result;
        if(this.result.statusKey == 200){
          console.log('items: ',this.result);
          this.storage.set('masterItemsArray', this.result.data);
          this.navCtrl.push('HomePage');
        }else if(this.result.statusKey == 400){
            this.presentAlert(this.result.message);
        }else{
            this.presentAlert('Something went wrong.. Please try again.');
        }
    },(err) => {
       loader.dismiss();
       console.log(err);
       this.presentAlert('Something went wrong.. Please try again.');
     });
  }

  presentAlert(msg) {
     let alert = this.alertCtrl.create({
       title: 'Prasad Medical',
       message: msg,
       buttons: [
         {
           text: 'Ok',
           role: 'cancel',
           handler: () => {
             //console.log('Cancel clicked');
           }
         }
       ]
     });
     alert.present();
   };



}
