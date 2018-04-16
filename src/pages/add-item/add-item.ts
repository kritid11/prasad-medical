import { Component } from '@angular/core';
import { NavController, NavParams, IonicPage } from 'ionic-angular';

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

  items : Array<{name: string, quantity: number}> = [];
  item: any;
  itemName: string = "";

  constructor(public navCtrl: NavController, public navParams: NavParams) {

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


  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddItemPage');
  }

  addItem(itemName){
    this.item = {
      itemName: itemName,
      quantity: 1
    };
    this.items.push(this.item);
    this.itemName = "";
  }

  increaseQuanity(index){
    this.items[index].quantity = this.items[index].quantity + 1;
  }

  decreaseQuanity(index){
    if(this.items[index].quantity !=1){
      this.items[index].quantity = this.items[index].quantity - 1;
    }
  }

  goToSelectMode(){
    this.navCtrl.push('SelectModePage');
  }

}
