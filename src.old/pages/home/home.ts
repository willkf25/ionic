import { Component } from '@angular/core';
import {AlertController, MenuController, NavController, LoadingController } from 'ionic-angular';

//Imports
import { ChoseOperatorPage } from './../chose-operator/chose-operator';
import { CallApiProvider } from './../../providers/call-api/call-api';



@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [CallApiProvider]
})
export class HomePage {
  data: any;
  user: string
  pass: string
  constructor(public navCtrl: NavController,
    public menuCtrl: MenuController,
    public CallApi: CallApiProvider,
    private alertCtrl: AlertController,
    public loadingCtrl: LoadingController
    ) {
    this.CallApi.choseHost_noLoading()
    this.menuCtrl.enable(false);

    if (window.localStorage.getItem('accessToken') == null) {
      let loading = this.loadingCtrl.create({
        content: 'Autenticando aguarde'
      });
      this.CallApi.choseHost(loading).then(data => {
        this.CallApi.getAccessToken(loading) //salva token no storage
      })
    }

    if(window.localStorage.getItem('logado') == "1") {
      this.navCtrl.setRoot(ChoseOperatorPage, {}, { animate: true, animation: "enter" });
    }
  }


  public login(): void { // Metodo de autenticacao
    let host = window.localStorage.getItem('host')
    this.CallApi.choseHost_noLoading()
    var data : any
    let loading = this.loadingCtrl.create({
      content: 'Autenticando aguarde ' + host
    });

    loading.present();
      this.CallApi.login(this.user, this.pass)
        .then(data => {
          loading.dismiss()
          this.data = data
          var codeRequest = this.data.code; // pega o código da request
          if (codeRequest == '200') {
            window.localStorage.setItem("logado", "1")
            window.localStorage.setItem("user", this.user)
            console.log(this.data)


            //listaColetores
            this.navCtrl.setRoot(ChoseOperatorPage, {}, { animate: true, animation: "enter" });
          }

          if (codeRequest == '42281') {
            let alert = this.alertCtrl.create({
              title: 'Erro ao Logar',
              subTitle: 'Usuário e Senha desconhecidos',
              buttons: ['Cancelar']
            });
            alert.present();
          }

          if (codeRequest == '4227') {
            let loading = this.loadingCtrl.create({
              content: 'Autenticando aguarde'
            });
            this.CallApi.getAccessToken(loading) //salva token no storage
            let alert = this.alertCtrl.create({
              title: 'Erro ao Logar',
              subTitle: 'O token não é mais válido, ou não existe um token. Tente Novamente.',
              buttons: ['OK']
            });
            alert.present();
          }
        });

  }
}
