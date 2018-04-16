import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

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

  orders: Array<{mode: string, placedDate: string, status: string, billNumber: string}> = [];
  showOrders: Array<{mode: string, placedDate: string, status: string, billNumber: string}> = [];

  order: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {

    //dummy values
    this.order = {mode: 'By Delivery', placedDate: '10/4/18 9.30am', status: 'Delivered', billNumber: '101'};
    this.orders.push(this.order);

    this.order = {mode: 'Pick Up', placedDate: '12/4/18 9.30am', status: 'Picked up', billNumber: '201'};
    this.orders.push(this.order);

    this.order = {mode: 'By Delivery', placedDate: '13/4/18 9.30am', status: 'On the way', billNumber: '301'};
    this.orders.push(this.order);

    this.order = {mode: 'Pick Up', placedDate: '15/4/18 9.30am', status: 'Order Ready for pickup', billNumber: '401'};
    this.orders.push(this.order);
    console.log('orders length: ', this.orders.length);


    this.setShowOrders();
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
        this.setShowOrders();
        // console.log("on empty search refill showOrders:",this.showOrders.length);
        // console.log("on empty search orders:",this.orders.length);
        break;
      }
      else if(this.orders[i].billNumber == billNumber){
        this.showOrders.splice(0);
        this.order = {
          billNumber: this.orders[i].billNumber,
          placedDate: this.orders[i].placedDate,
          mode: this.orders[i].mode,
          status: this.orders[i].status
        }
        this.showOrders.push(this.orders[i]);
        break;
      }else{
        this.showOrders.splice(0);
      }
    }
  }

  setShowOrders(){
    for(var i=0; i < this.orders.length; i++){
      this.order = {
        billNumber: this.orders[i].billNumber,
        placedDate: this.orders[i].placedDate,
        mode: this.orders[i].mode,
        status: this.orders[i].status
      }
      this.showOrders.push(this.order);
    }
  }

  goToOrderDetailsPage(){
    //set order details of this bill no in storage to fetch on next page
    this.navCtrl.push('OrderDetailsPage');
  }

}
