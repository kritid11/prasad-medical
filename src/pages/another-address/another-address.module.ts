import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AnotherAddressPage } from './another-address';

@NgModule({
  declarations: [
    AnotherAddressPage,
  ],
  imports: [
    IonicPageModule.forChild(AnotherAddressPage),
  ],
  entryComponents: [AnotherAddressPage]
})
export class AnotherAddressPageModule {}
