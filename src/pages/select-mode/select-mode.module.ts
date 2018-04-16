import { NgModule } from '@angular/core';
import { SelectModePage} from './select-mode';
import { IonicPageModule } from 'ionic-angular';

@NgModule({
  declarations: [SelectModePage],
  imports: [IonicPageModule.forChild(SelectModePage)],
  entryComponents: [SelectModePage]
})
export class SelectModePageModule { }
