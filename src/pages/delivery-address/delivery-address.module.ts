import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DeliveryAddressPage } from './delivery-address';

@NgModule({
  declarations: [
    DeliveryAddressPage,
  ],
  imports: [
    IonicPageModule.forChild(DeliveryAddressPage),
  ],
  entryComponents: [DeliveryAddressPage]
})
export class DeliveryAddressPageModule {}
