import { NgModule } from '@angular/core';
import { NewRequestPage} from './new-request';
import { IonicPageModule } from 'ionic-angular';

@NgModule({
  declarations: [NewRequestPage],
  imports: [IonicPageModule.forChild(NewRequestPage)],
  entryComponents: [NewRequestPage]
})
export class NewRequestPageModule { }
