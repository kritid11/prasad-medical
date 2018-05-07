import { Component } from '@angular/core';
import { NavController, NavParams, IonicPage } from 'ionic-angular';

import { Storage } from '@ionic/storage';
import { AlertController } from 'ionic-angular';

/**
 * Generated class for the AddItemPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

 //import { SelectModePage } from '../select-mode/select-mode';

@IonicPage()
@Component({
  selector: 'page-add-item',
  templateUrl: 'add-item.html',
})
export class AddItemPage {

  items : Array<{item_name: string, item_quantity: number}> = [];
  item: any;
  itemName: string = "";

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private storage: Storage,
              private alertCtrl: AlertController) {

    this.storage.get('itemsArray').then((val) => {
        console.log('from storage itemsArray', val);
        if(val != null){
          this.items = val;
        }
    });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddItemPage');
  }

  addItem(itemName){
    if(this.itemName == ""){
      this.presentAlert('Please enter the name of item');
      return;
    }

    this.item = {
      item_name: itemName,
      item_quantity: 1
    };
    this.items.push(this.item);
    this.itemName = "";

    //todo save it in Storage
    this.storage.set('itemsArray',this.items);
    console.log('itemsArray saved',this.storage.get('itemsArray'));
  }

  increaseQuanity(index){
    this.items[index].item_quantity = this.items[index].item_quantity + 1;
  }

  decreaseQuanity(index){
    if(this.items[index].item_quantity !=1){
      this.items[index].item_quantity = this.items[index].item_quantity - 1;
    }else{
      this.items.splice(index,1);
    }
  }

  goToSelectMode(){
    this.storage.get('pxIdArray').then((val) => {
      console.log('storage pxIdArray', val);

      this.storage.get('itemsArray').then((val1) => {
        console.log('storage itemsArray', val1);

        if(val1 != null || val != null){
          this.navCtrl.push('SelectModePage');
        }else{
          this.presentAlert('Please add atleast one item or one prescrition to place order');
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
