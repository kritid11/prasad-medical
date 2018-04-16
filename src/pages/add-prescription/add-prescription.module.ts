import { NgModule } from '@angular/core';
import { AddPrescriptionPage} from './add-prescription';
import { IonicPageModule } from 'ionic-angular';

@NgModule({
  declarations: [AddPrescriptionPage],
  imports: [IonicPageModule.forChild(AddPrescriptionPage)],
  entryComponents: [AddPrescriptionPage]
})
export class AddPrescriptionPageModule { }
