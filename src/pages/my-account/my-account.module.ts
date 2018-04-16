import { NgModule } from '@angular/core';
import { MyAccountPage} from './my-account';
import { IonicPageModule } from 'ionic-angular';

@NgModule({
  declarations: [MyAccountPage],
  imports: [IonicPageModule.forChild(MyAccountPage)],
  entryComponents: [MyAccountPage]
})
export class MyAccountPageModule { }
