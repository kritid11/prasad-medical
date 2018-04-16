import { NgModule } from '@angular/core';
import { AboutUsPage} from './about-us';
import { IonicPageModule } from 'ionic-angular';

@NgModule({
  declarations: [AboutUsPage],
  imports: [IonicPageModule.forChild(AboutUsPage)],
  entryComponents: [AboutUsPage]
})
export class AboutUsPageModule { }
