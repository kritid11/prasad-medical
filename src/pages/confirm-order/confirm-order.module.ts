import { NgModule } from '@angular/core';
import { ConfirmOrderPage} from './confirm-order';
import { IonicPageModule } from 'ionic-angular';

@NgModule({
  declarations: [ConfirmOrderPage],
  imports: [IonicPageModule.forChild(ConfirmOrderPage)],
  entryComponents: [ConfirmOrderPage]
})
export class ConfirmOrderPageModule { }
