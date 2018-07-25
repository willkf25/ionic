import { CosmeticCollectPage } from './../pages/cosmetic-collect/cosmetic-collect';
import { ChoseClientPage } from './../pages/chose-client/chose-client';
import { AlimentCollectPage } from './../pages/aliment-collect/aliment-collect';
import { SwabCollectPage } from './../pages/swab-collect/swab-collect';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { IonicStorageModule } from '@ionic/storage';

import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { CallApiProvider } from './../providers/call-api/call-api';
import { ChoseOperatorPage } from '../pages/chose-operator/chose-operator';
import { ListCollectPage } from './../pages/list-collect/list-collect';
import { HomePage } from '../pages/home/home';
import { HttpModule } from '@angular/http';
import { MyApp } from './app.component';
import { WaterCollectPage } from './../pages/water-collect/water-collect';
import { SyncPage } from './../pages/sync/sync';
import { ChoseCollectTypePage } from '../pages/chose-collect-type/chose-collect-type';
import { MatrizListPage } from '../pages/matriz-list/matriz-list';





@NgModule({
  declarations: [
    AlimentCollectPage,
    ChoseClientPage,
    ChoseOperatorPage,
    CosmeticCollectPage,
    HomePage,
    ListCollectPage,
    MyApp,
    SyncPage,
    SwabCollectPage,
    WaterCollectPage,
    ChoseCollectTypePage,
    MatrizListPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    AlimentCollectPage,
    ChoseClientPage,
    ChoseOperatorPage,
    CosmeticCollectPage,
    ListCollectPage,
    HomePage,
    MyApp,
    SyncPage,
    SwabCollectPage,
    WaterCollectPage,
    ChoseCollectTypePage,
    MatrizListPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    CallApiProvider
  ]
})
export class AppModule {}
