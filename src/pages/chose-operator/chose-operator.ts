import { CallApiProvider } from './../../providers/call-api/call-api';
import { ChoseClientPage } from './../chose-client/chose-client';
import { Component } from '@angular/core';
import { IonicPage, MenuController, NavController, NavParams, LoadingController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { HomePage } from '../home/home';




@IonicPage()
@Component({
  selector: 'page-chose-operator',
  templateUrl: 'chose-operator.html',
  providers: [CallApiProvider]
})
export class ChoseOperatorPage {


  public listOperator = []

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public menuCtrl: MenuController,
    public callApi: CallApiProvider,
    private storage: Storage,
    public loadingCtrl: LoadingController,
  ) {
    this.menuCtrl.enable(false); // desativa menu
    if (window.localStorage.getItem('coletorId') != null) { //ja foi feita o login e escolhido o operador
      this.navCtrl.setRoot(ChoseClientPage, {}, { animate: true, animation: "enter" });
    }
    this.storage.get('listaColetores').then((val) => { //erifica se tem lista armazeada
      if (val == null) {
        console.log('sem lista de operadores')
        let loading = this.loadingCtrl.create({
          content: 'Please wait...'
        });

        loading.present();
        var list = this.callApi.getListColector().then(data => {
          storage.set('listaColetores', data) //salva lista
          loading.dismiss();
          this.navCtrl.setRoot(this.navCtrl.getActive().component);
        })


      } else {
        console.log('lista do storage')
        this.listOperator = val
        console.log(val)
      }
    });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChoseOperatorPage');
  }

  //metodo responsavel por salvar dados do operador escolhido
  public ChoseOperator(id, name): void {
    window.localStorage.setItem('coletorId', id);
    window.localStorage.setItem('id_coletor', id);
    window.localStorage.setItem('name_coletor', name);

    //this.navCtrl.setRoot(ListCollectPage, {}, { animate: true, animation: "enter" });
    //alert(id)

    let loading = this.loadingCtrl.create({ //cria Loading
      content: 'Obtendo Agenda do dia - Aguarde'
    });
    loading.present(); //mostra loading
    this.storage.get('agenda').then((val) => {
      if (val == null) { //Não existe registro
        this.callApi.getAgendaColetor(id) //chama metodo
          .then(data => {
            this.storage.set('agenda', data) //salva no local a lista
            console.log('salvouuuu')
            loading.dismiss(); //remove o loading

            this.navCtrl.setRoot(ChoseClientPage, {}, { animate: true, animation: "enter" });
          })
      } else {
        loading.dismiss(); //remove o loading
        this.navCtrl.setRoot(ChoseClientPage, {}, { animate: true, animation: "enter" });
      }
    })



  }

  public getAgenda(id) { //recebe agenda
    let loading = this.loadingCtrl.create({ //cria Loading
      content: 'Obtendo Agenda do dia - Aguarde'
    });
    loading.present(); //mostra loading
    this.storage.get('agenda').then((val) => {
      if (val == null) {
        this.callApi.getAgendaColetor(id) //chama metodo
          .then(data => {
            this.storage.set('agenda', data) //salva no local a lista
            loading.dismiss(); //remove o loading
          })
      }
    })
    loading.dismiss(); //remove o loading


  }


  LogOut() {
    this.storage.set('agenda', null)
    this.storage.set('listaColetores', null)
    window.localStorage.removeItem('accessToken')
    window.localStorage.removeItem("logado")
    window.localStorage.removeItem("accessToken")
    window.localStorage.removeItem("coletorId")
    window.localStorage.removeItem("idColetor")
    this.navCtrl.setRoot(HomePage, {}, { animate: true, animation: "enter" });
  }

}
