import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MatrizListPage } from './matriz-list';

@NgModule({
  declarations: [
    MatrizListPage,
  ],
  imports: [
    IonicPageModule.forChild(MatrizListPage),
  ],
})
export class MatrizListPageModule {}
