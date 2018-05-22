import { NgModule } from '@angular/core';
import { AddItemPage} from './add-item';
import { IonicPageModule } from 'ionic-angular';
import { SelectSearchableModule } from 'ionic-select-searchable';

@NgModule({
  declarations: [AddItemPage],
  imports: [
    IonicPageModule.forChild(AddItemPage),
    SelectSearchableModule
  ],
  entryComponents: [AddItemPage]
})
export class AddItemPageModule { }
