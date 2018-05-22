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

  items : Array<{id: number, item_name: string, item_quantity: number, item_price : number}> = [];
  item: any;
  smallImgs: Array<string> = [];
  order : any;
  total : number = 0;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private storage: Storage,
              private alertCtrl: AlertController) {

    this.order = {billNumber: "", mode: "", placedDate: "", status: ""};
    this.getOrderDetails();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OrderDetailsPage');
  }

  gotToSelectMode(){
    this.storage.set('prescritionArray',this.smallImgs);
    this.storage.set('itemsArray',this.items);
    this.navCtrl.push('SelectModePage');
  }

  getOrderDetails(){
    this.storage.get('smallImgs').then((val) => {
      console.log('storage smallImgs', val);

      this.storage.get('itemsArray').then((val1) => {
        console.log('storage itemsArray', val1);

        if(val1 != null && val1 != undefined){
          this.items = val1;
        }

        if(val != null && val != undefined){
          this.smallImgs = val;
        }

        for(var i=0; i<this.items.length; i++){
          this.total = this.total + (this.items[i].item_quantity * this.items[i].item_price);
        }

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
