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
  selector: 'page-order-details',
  templateUrl: 'order-details.html',
})

export class OrderDetailsPage {

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

  confirmCancel(){
    this.presentAlertWithTwoBtns('Are You sure you want to cancel the order?','Yes','No');
  }

  cancelOrder(){
    //todo: call api to cancel order
  }

  gotToSelectMode(){
    //save orderdetails for next page
    if(this.smallImgs.length == 0){
      this.presentAlert('Please add Prescription');
    }
    else{
      this.storage.set('prescritionArray',this.smallImgs);
      this.storage.set('itemsArray',this.items);

      this.navCtrl.push('SelectModePage');
    }
  }

  increaseQuanity(index){
    this.items[index].quantity = this.items[index].quantity + 1;
  }

  decreaseQuanity(index){
    if(this.items[index].quantity !=1){
      this.items[index].quantity = this.items[index].quantity - 1;
    }
  }

  deletePrescription(index){
    //console.log('delete item i:',index);
    this.smallImgs.splice(index,1);

    this.storage.set('prescritionArray',this.smallImgs);
    console.log('pxArray after delete',this.storage.get('prescritionArray'));
  }

  callGetOrderDetailsApi(){
    this.storage.get('userId').then((val) => {
      console.log('storage userId', val);

      this.storage.get('billno').then((val) => {
        console.log('storage billno', val);

        /*todo: call api with userid and billno,
        on success initialise px,items, status,placedDate,billno,mode  and show
        else show error popup
        */

        //dummy
        this.order = {billNumber: "101", mode: "By Delivery", placedDate: "10/4/18 9.30am", status: "Delivered"};

        this.smallImgs.push('assets/imgs/logo.png');
        this.smallImgs.push('assets/imgs/logo.png');

        this.item = {
          itemName: 'Calpol',
          quantity: 1
        };
        this.items.push(this.item);

        this.item = {
          itemName: 'Crocin',
          quantity: 1
        };
        this.items.push(this.item);

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

  presentAlertWithTwoBtns(msg, btn1, btn2) {
    let alert = this.alertCtrl.create({
      title: 'Prasad Medical',
      message: msg,
      buttons: [
        {
          text: btn1,
          handler: () => {
            this.cancelOrder();
            //console.log('Cancel clicked');
          }
        },
        {
          text: btn2,
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
