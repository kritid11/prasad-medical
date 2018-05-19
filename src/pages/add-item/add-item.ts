import { Component } from '@angular/core';
import { NavController, NavParams, IonicPage } from 'ionic-angular';

import { Storage } from '@ionic/storage';
import { AlertController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { RecursiveSearchService } from '../../providers/recursive-search-service';

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

  items : Array<{item_name: string, item_quantity: number, price : number}> = [];
  item: any;
  itemName: string = "";


  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private storage: Storage,
              private alertCtrl: AlertController,
              public loadingCtrl: LoadingController,
              public recursiveSearchService: RecursiveSearchService) {

    this.storage.get('itemsArray').then((val) => {
        console.log('from storage itemsArray', val);
        if(val == null || val == undefined){
          this.storage.set('itemsArray',this.items);
        }else{
          this.items = val;
        }
    });

    //getAllItems();

  }

  getAllItems(){
    let loader = this.loadingCtrl.create({
      content: "getting Item Master.."
    });
    loader.present();

    this.restProvider.getRequest('/getAllItems')
    .then((result) => {
      loader.dismiss();
      console.log(result);
      this.result = result;
      if(this.result.statusKey == 200){
        this.result = result;
        this.items = this.result;
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
    this.storage.set('itemsArray',this.items);
  }

  decreaseQuanity(index){
    if(this.items[index].item_quantity !=1){
      this.items[index].item_quantity = this.items[index].item_quantity - 1;
    }else{
      this.items.splice(index,1);
    }
    this.storage.set('itemsArray',this.items);
  }

  goToReviewOrder(){
    this.storage.get('pxIdArray').then((val) => {
      console.log('storage pxIdArray', val);

      this.storage.get('itemsArray').then((val1) => {
        console.log('storage itemsArray', val1);

        if(val1.length != 0 || val.length != 0){
          this.navCtrl.push('ReviewOrderPage');
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
