import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Storage } from '@ionic/storage';
import { AlertController } from 'ionic-angular';

/**
 * Generated class for the OrderDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-review-order',
  templateUrl: 'review-order.html',
})

export class ReviewOrderPage {

  items : Array<{name: string, quantity: number}> = [];
  item: any;
  smallImgs: Array<string> = [];
  order : any;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private storage: Storage,
              private alertCtrl: AlertController) {

    this.order = {billNumber: "", mode: "", placedDate: "", status: ""};
    this.callGetOrderDetailsApi();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OrderDetailsPage');
  }

  gotToSelectMode(){
    this.storage.set('prescritionArray',this.smallImgs);
    this.storage.set('itemsArray',this.items);
    this.navCtrl.push('SelectModePage');
  }

  callGetOrderDetailsApi(){
    this.storage.get('smallImgs').then((val) => {
      console.log('storage smallImgs', val);

      this.storage.get('itemsArray').then((val1) => {
        console.log('storage itemsArray', val1);

        /*todo: call api with userid and billno,
        on success initialise px,items, status,placedDate,billno,mode  and show
        else show error popup
        */

        this.items = val1;
        this.smallImgs = val;

      });
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
