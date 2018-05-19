import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Storage } from '@ionic/storage';
import { AlertController } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';
import { LoadingController } from 'ionic-angular';
import { DatePipe } from '@angular/common'

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
  result : any;
  currentAction: string = 'NONE';

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private storage: Storage,
              private alertCtrl: AlertController,
              public restProvider: RestProvider,
              public loadingCtrl: LoadingController,
              public datepipe: DatePipe) {

    this.order = {id: "", order_mode: "", created_at: "", order_status: ""};
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
    this.storage.get('order_id').then((val) => {
      console.log('storage order_id', val);

      let loader = this.loadingCtrl.create({
        content: "cancelling the Order..."
      });
      loader.present();

      this.restProvider.getRequest('/cancelOrder', '/' + val)
      .then((result) => {
        loader.dismiss();
        console.log(result);
        this.result = result;
        if(this.result.statusKey == 200){
          this.currentAction = 'ORDER_CANCEL_SUCCESS';
          this.presentAlert(this.result.message);
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
  });
  }

  gotToSelectMode(){
    //save orderdetails for next page
    if(this.smallImgs.length != 0 || this.items.length != 0){
      this.storage.set('prescritionArray',this.smallImgs);
      this.storage.set('itemsArray',this.items);
      this.navCtrl.push('SelectModePage');
    }else{
      this.presentAlert('Please add atleast one item or one prescrition to place order');
    }
  }

  callGetOrderDetailsApi(){

      this.storage.get('order_id').then((val) => {
        console.log('storage order_id', val);

        /*todo: call api with userid and billno,
        on success initialise px,items, status,placedDate,billno,mode  and show
        else show error popup
        */

        let loader = this.loadingCtrl.create({
          content: "getting Order Details..."
        });
        loader.present();

        this.restProvider.getRequest('/getOrderDetails', '/' + val)
        .then((result) => {
          loader.dismiss();
          console.log(result);
          this.result = result;
          if(this.result.statusKey == 200){
            this.order = this.result.data;
            if(this.order.order_mode == 'p'){
              this.order.order_mode = 'Pickup';
            }else{
              this.order.order_mode = 'Delivery';
            }
            this.items = this.result.data.item_array;
            console.log('items: ',this.result.data.item_array);
            this.smallImgs = this.result.data.prescription_array;
            console.log('px: ',this.result.data.prescription_array);
            this.order.created_at = this.datepipe.transform(this.order.created_at, 'dd-MM-yyyy');
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
            if(this.currentAction == 'ORDER_CANCEL_SUCCESS'){
              this.navCtrl.pop();
            }
            this.currentAction = 'NONE';
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
