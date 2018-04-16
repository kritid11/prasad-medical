import { NgModule } from '@angular/core';
import { ForgotPasswordPage} from './forgot-password';
import { IonicPageModule } from 'ionic-angular';

@NgModule({
  declarations: [ForgotPasswordPage],
  imports: [IonicPageModule.forChild(ForgotPasswordPage)],
  entryComponents: [ForgotPasswordPage]
})
export class ForgotPasswordPageModule { }
