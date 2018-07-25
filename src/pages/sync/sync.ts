import { CallApiProvider } from './../../providers/call-api/call-api';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';


@IonicPage()
@Component({
  selector: 'page-sync',
  templateUrl: 'sync.html',
  providers: [CallApiProvider]
})
export class SyncPage {
  data: any;
  constructor(private alertCtrl: AlertController,
    public navCtrl: NavController,
    public navParams: NavParams,
    private storage: Storage,
    public callApi: CallApiProvider,
    public loadingCtrl: LoadingController) {

      this.callApi.choseHost_noLoading()
        let loading = this.loadingCtrl.create({
          content: 'Atualizando Token de acesso ...'
        });

        loading.present();

      this.callApi.getAccessToken(loading).then(data => {
        loading.dismiss()
        console.log('ACCESS TOKEN: '+data)
      })
  }

  ionViewDidLoad() {
    this.callApi.choseHost_noLoading()
    console.log('ionViewDidLoad SyncPage');
  }

  ClearListCollected(): void { //limpa todos os dados coletados
    let alert = this.alertCtrl.create({
      title: 'Tem certeza ?',
      message: 'Essa ação irá apagar todos os dados coletados, tem certeza que deseja prosseguir ?',
      buttons: [
        {
          text: 'Não',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Sim',
          handler: () => {
            this.storage.remove('coletas')
            this.storage.remove('listaColetores')
          }
        }
      ]
    });
    alert.present();
  }

  ClearAgendaCollect(): void { //limpa todos os dados da agenda de coleta
    this.storage.set('agenda', null)
    window.localStorage.removeItem('accessToken')
    let alert = this.alertCtrl.create({
      title: 'Sucesso',
      subTitle: 'Agenda limpa com sucesso',
      buttons: ['OK']
    });
    alert.present();
  }

  GetAgendaCollector(): void { //limpa todos os dados da agenda de coleta
    this.callApi.getAgendaColetor(window.localStorage.getItem('id_coletor')) //chama metodo
      .then(data => {
        this.data = data
        this.storage.set('agenda', this.data.Agenda) //salva no local a lista
        //alert('salvouuuu')
      })

  }

  public count = 0;
  sendDatas() {
    this.callApi.choseHost_noLoading()
    let loading = this.loadingCtrl.create({
      content: 'Enviando dados para o servidor, aguarde ...'
    });

    loading.present();
    this.storage.get('coletas').then((val) => {
      console.log(val)
      if(val == null || val == undefined) {
        loading.dismiss()
        let alert = this.alertCtrl.create({
          title: 'Erro',
          subTitle: 'Não existem dados para serem enviados',
          buttons: ['OK']
        });
        alert.present();
      } else {
        const promises = val.map(item => {
          return this.callApi.sendCollect(item, loading)
        })

        //this.callApi.choseHost_noLoading().then(data => {
          Promise.all(promises).then(responses => {
            console.log(responses)
            this.data = responses
            if(this.data[0].status == 404) {
              let alert = this.alertCtrl.create({
                title: 'Erro',
                subTitle: 'Ocorreu um erro ao enviar os dados ao servidor. Acione a equipe de suporte.',
                buttons: ['OK']
              });
              alert.present();
            } else {
              if(this.count == 0) {
                this.count++;
                loading.dismiss()
                loading.dismiss()
                loading.dismiss()
                this.sendDatas()
                return 0
              }
              let alert = this.alertCtrl.create({
                title: 'Sucesso',
                subTitle: 'Dados enviados com sucesso ao servidor.',
                buttons: ['OK']
              });
              alert.present();
            }
            loading.dismiss()
          },
          err => {
            loading.dismiss()
            console.log(err);
            let alert = this.alertCtrl.create({
              title: 'Erro',
              subTitle: 'Ocorreu um erro ao enviar os dados ao servidor. Acione a equipe de suporte.',
              buttons: ['OK']
            });
            alert.present();
            //alert('Ocorreu um erro ao enviar os dados ao servidor. Acione a equipe de suporte.');
          })
        //});

      }

    })
  }





}
