import { NgModule } from '@angular/core';
import { TermsAndConditionsPage} from './terms-and-conditions';
import { IonicPageModule } from 'ionic-angular';

@NgModule({
  declarations: [TermsAndConditionsPage],
  imports: [IonicPageModule.forChild(TermsAndConditionsPage)],
  entryComponents: [TermsAndConditionsPage]
})
export class TermsAndConditionsPageModule { }
