import { Component } from '@angular/core';
import { NavController, IonicPage } from 'ionic-angular';

// import { AddPrescriptionPage } from '../add-prescription/add-prescription';
// import { AddItemPage } from '../add-item/add-item';
// import { SelectModePage } from '../select-mode/select-mode';

@IonicPage()
@Component({
  selector: 'page-new-request',
  templateUrl: 'new-request.html'
})
export class NewRequestPage {
	  constructor(public navCtrl: NavController) {}

    goToAddPrescription(){
      this.navCtrl.push('AddPrescriptionPage');
    }

    goToAddItems(){
      this.navCtrl.push('AddItemPage');
    }

    goToOrderHistory(){
      this.navCtrl.push('OrderHistoryPage');
    }

}
