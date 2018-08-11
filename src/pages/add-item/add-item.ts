import { Component } from '@angular/core';
import { NavController, NavParams, IonicPage } from 'ionic-angular';

import { Storage } from '@ionic/storage';
import { AlertController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { SelectSearchableComponent } from 'ionic-select-searchable';
import { InfiniteScroll } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { delay } from 'rxjs/operators';

class Item {
     public id: number;
     public item_name: string;
     public item_quantity: number;
     public item_price: number;
 }

@IonicPage()
@Component({
  selector: 'page-add-item',
  templateUrl: 'add-item.html',
})
export class AddItemPage {
  masterItems: Item[];
  masterItem: Item;
  ports10Page = 2;

  items : Array<{id: number, item_name: string, item_quantity: number, item_price : number}> = [];
  item: any;
  //itemName: string = "";

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private storage: Storage,
              private alertCtrl: AlertController,
              public loadingCtrl: LoadingController) {

      this.storage.get('masterItemsArray').then((val) => {
          console.log('from storage masterItemsArray', val);
          this.masterItems = val;
      });

      this.storage.get('itemsArray').then((val) => {
          console.log('from storage itemsArray', val);
          if(val == null || val == undefined){
            this.storage.set('itemsArray',this.items);
          }else{
            this.items = val;
          }
      });
  }

  getMorePorts(event: { component: SelectSearchableComponent, infiniteScroll: InfiniteScroll }) {
        // Trere're no more ports - disable infinite scroll.
        if (this.ports10Page > 3) {
            event.infiniteScroll.enable(false);
            return;
        }

        this.getPortsAsync(this.ports10Page).subscribe(masterItems => {
            event.component.items = event.component.items.concat(this.masterItems);
            event.infiniteScroll.complete();
            this.ports10Page++;
        });
    }

    searchPorts(event: { component: SelectSearchableComponent, text: string }) {
        let text = (event.text || '').trim().toLowerCase();

        if (!text) {
            event.component.items = [];
            return;
        }
         else if (event.text.length < 3) {
            return;
        }

        event.component.isSearching = true;

        this.getPortsAsync().subscribe(masterItems => {
            event.component.items = this.masterItems.filter(masterItem => {
                return masterItem.item_name.toLowerCase().indexOf(text) !== -1
            });

            event.component.isSearching = false;
        });
    }

    getPorts(page: number = 1, size: number = 15): Item[] {
       return this.masterItems.slice((page - 1) * size, ((page - 1) * size) + size);
   }

   getPortsAsync(page: number = 1, size: number = 15): Observable<Item[]> {
       return new Observable<Item[]>(observer => {
           observer.next(this.getPorts(page, size));
           observer.complete()
       }).pipe(delay(2000));
   }

    // portItemTemplate(port: Port) {
    //     return `${port.name} (${port.country})`;
    // }


  itemChange(event: { component: SelectSearchableComponent, value: any }) {
      console.log('item:', event.value);
      this.masterItem = event.value;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddItemPage');
  }

  addItem(){
    if(this.masterItem == null){
      this.presentAlert('Please select one item');
      return;
    }

    this.item = {
      id : this.masterItem.id,
      item_name: this.masterItem.item_name,
      item_quantity: 1,
      item_price: this.masterItem.item_price,
    };
    this.items.push(this.item);
    this.masterItem = null;

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
      if(val.length != 0){
        this.navCtrl.push('ReviewOrderPage');
      }else{
        this.presentAlert('Please add atleast one Prescrition to proceed');
      }
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
