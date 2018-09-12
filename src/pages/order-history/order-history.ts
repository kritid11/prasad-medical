import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { RestProvider } from '../../providers/rest/rest';
import { LoadingController } from 'ionic-angular';

/**
 * Generated class for the OrderHistoryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

 //import { NewRequestPage } from '../new-request/new-request';

@IonicPage()
@Component({
  selector: 'page-order-history',
  templateUrl: 'order-history.html',
})
export class OrderHistoryPage {

  // orders: Array<{mode: string, placedDate: string, status: string, billNumber: string}> = [];
  // showOrders: Array<{mode: string, placedDate: string, status: string, billNumber: string}> = [];
  @ViewChild('focusInput') searchInput ;
  order: any;
  result: any;
  orders: Array<any> = [];
  showOrders: Array<any> = [];

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private alertCtrl: AlertController,
              private storage: Storage,
              public restProvider: RestProvider,
              public loadingCtrl: LoadingController) {

    //todo call getOrderHistoryApi, show the list of orders got
    this.callGetOrderHistoryApi();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OrderHistoryPage');

  }

  goToNewRequestPage(){
    this.navCtrl.setRoot('NewRequestPage');
  }

  searchByBillNumber(billNumber){
    //todo: filter orders based on bill no.
    for(var i=0; i < this.orders.length; i++){
      if(billNumber == "" || billNumber == undefined){
        this.resetShowOrders();
        // console.log("on empty search refill showOrders:",this.showOrders.length);
        // console.log("on empty search orders:",this.orders.length);
        break;
      }
      else if(this.orders[i].id == billNumber){
        this.showOrders.splice(0);
        this.order = {
          id: this.orders[i].id,
          created_at: this.orders[i].created_at.replace(/\s/g, "T"),
          order_mode: this.orders[i].order_mode,
          order_status: this.orders[i].order_status
        }
        this.showOrders.push(this.orders[i]);
        break;
      }else{
        this.showOrders.splice(0);
      }
    }
  }

  resetShowOrders(){
    for(var i=0; i < this.orders.length; i++){
      if(this.orders[i].order_mode == 'p'){
        this.orders[i].order_mode = "Pickup";
      }else{
        this.orders[i].order_mode = "Delivery";
      }
      this.order = {
        id: this.orders[i].id,
        created_at: this.orders[i].created_at.replace(/\s/g, "T"),
        order_mode: this.orders[i].order_mode,
        order_status: this.orders[i].order_status
      }
      this.showOrders.push(this.order);
    }

    this.searchInput.setFocus();
  }

  goToOrderDetailsPage(i){
    //saving billno in storage, to call getORderDetails on next page
    console.log('order id selected:', this.showOrders[i].id);
    this.storage.set('order_id',this.showOrders[i].id);
    this.navCtrl.push('OrderDetailsPage');
  }

  callGetOrderHistoryApi() {
        this.storage.get('userId').then((val) => {

          console.log('storage userId', val);
          let loader = this.loadingCtrl.create({
            content: "Getting Order History..."
          });
          loader.present();

          this.restProvider.getRequest('/getOrderHistory', '/' + val)
          .then((result) => {
            loader.dismiss();
            console.log(result);
            this.result = result;
            if(this.result.statusKey == 200){
              this.orders = this.result.data;
              console.log('orders length: ', this.orders.length);

              //this.showOrders = this.orders;
              this.resetShowOrders();

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
              //console.log('Cancel clicked');
            }
          }
        ]
      });
      alert.present();
    }

}
