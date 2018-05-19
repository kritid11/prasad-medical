import { NgModule } from '@angular/core';
import { AddItemPage} from './add-item';
import { IonicPageModule } from 'ionic-angular';
import { AutoCompleteModule } from 'ionic2-auto-complete';

@NgModule({
  declarations: [AddItemPage],
  imports: [
    AutoCompleteModule,
    IonicPageModule.forChild(AddItemPage)
  ],
  entryComponents: [AddItemPage]
})
export class AddItemPageModule { }
