import { Storage } from '@ionic/storage';
import { Component, ViewChild } from '@angular/core';
import { Platform, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';

import { SplashScreen } from '@ionic-native/splash-screen';

import { ChoseClientPage } from './../pages/chose-client/chose-client';
import { HomePage } from '../pages/home/home';
import { SyncPage } from './../pages/sync/sync';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  //lista do menu
  @ViewChild(Nav) nav:Nav;
  pages : [{title: string, component:any}];

  rootPage:any = HomePage;

  constructor(platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    public storage:Storage) {

    /* *** Conteudo do menu - Augusto Furlan *** */
    this.pages = [
      {title:'Clientes', component: ChoseClientPage},
      {title:'Sincronizar',  component: SyncPage},
      {title:'Logout', component: HomePage}
    ]

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }

  //*** Metodo abre page do menu - Augusto Furlan ***
  OpenPage(page: {title:string, component:any} ) :void {
    if(page.title == "Logout") {
      this.storage.set('agenda', null)
      this.storage.set('listaColetores', null)
      window.localStorage.removeItem('accessToken')
      window.localStorage.removeItem("logado")
      window.localStorage.removeItem("accessToken")
      window.localStorage.removeItem("coletorId")
      window.localStorage.removeItem("idColetor")

      //this.storage.remove('agenda')
    }
    this.nav.setRoot(page.component);
  }

}

