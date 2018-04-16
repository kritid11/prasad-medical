import { NgModule } from '@angular/core';
import { PaymentAccDetailsPage} from './payment-acc-details';
import { IonicPageModule } from 'ionic-angular';

@NgModule({
  declarations: [PaymentAccDetailsPage],
  imports: [IonicPageModule.forChild(PaymentAccDetailsPage)],
  entryComponents: [PaymentAccDetailsPage]
})
export class PaymentAccDetailsPageModule { }
