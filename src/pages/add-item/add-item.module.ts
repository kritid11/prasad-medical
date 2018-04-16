import { NgModule } from '@angular/core';
import { AddItemPage} from './add-item';
import { IonicPageModule } from 'ionic-angular';

@NgModule({
  declarations: [AddItemPage],
  imports: [IonicPageModule.forChild(AddItemPage)],
  entryComponents: [AddItemPage]
})
export class AddItemPageModule { }
