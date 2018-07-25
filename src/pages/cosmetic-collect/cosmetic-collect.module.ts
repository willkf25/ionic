import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CosmeticCollectPage } from './cosmetic-collect';

@NgModule({
  declarations: [
    CosmeticCollectPage,
  ],
  imports: [
    IonicPageModule.forChild(CosmeticCollectPage),
  ],
})
export class CosmeticCollectPageModule {}
