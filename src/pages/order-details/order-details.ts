import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

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

  //dummy
  order : any = {billNumber: "101", mode: "By Delivery", placedDate: "10/4/18 9.30am", status: "Delivered"};

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OrderDetailsPage');
  }

  cancelOrder(){
    //todo: call api to cancel order
  }

  gotToSelectMode(){
    this.navCtrl.push('SelectModePage');
  }

  increaseQuanity(index){
    this.items[index].quantity = this.items[index].quantity + 1;
  }

  decreaseQuanity(index){
    if(this.items[index].quantity !=1){
      this.items[index].quantity = this.items[index].quantity - 1;
    }
  }

}
