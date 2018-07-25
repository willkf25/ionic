import { CosmeticCollectPage } from './../cosmetic-collect/cosmetic-collect';
import { Component } from '@angular/core';
import { IonicPage, MenuController, NavController, NavParams, AlertController } from 'ionic-angular';
//import { ListCollectPage } from '../list-collect/list-collect';
import { Storage } from '@ionic/storage';
import { WaterCollectPage } from '../water-collect/water-collect';
import { AlimentCollectPage } from '../aliment-collect/aliment-collect';
import { SwabCollectPage } from '../swab-collect/swab-collect';
import { ChoseCollectTypePage } from '../chose-collect-type/chose-collect-type';


@IonicPage()
@Component({
  selector: 'page-chose-client',
  templateUrl: 'chose-client.html',
})
export class ChoseClientPage {
   coletasRealizadas = []
  /*public listClient = [
    { id: 1, nome: 'Cliente 1', address: 'R. xxxx, yy' },
    { id: 2, nome: 'Client 2', address: 'R. Augusta, 3377' },
    { id: 3, nome: 'Cliente 3', address: 'R. Cleber de Toledo, 33' },
    { id: 4, nome: 'Cliente 4', address: 'R. José, 77' }
  ]*/

  public name_coletor = null
  public listClient = [];
  public ListaDeCliente = []
  public ListaParaExibicao = [] // monta o array que será exibido
  public Arrayaux = [];
  public idClient = null;
  public aux; // var q marca se teve coleta

  constructor(public menuCtrl: MenuController,
    public navCtrl: NavController,
    public navParams: NavParams,
    private storage: Storage,
    private alertCtrl: AlertController,
  ) {
      this.menuCtrl.enable(true); //Ativa o menu
      var nome = window.localStorage.getItem('name_coletor'); //load operator
      this.name_coletor = nome //set operator in view

      /*this.storage.get('agenda').then((val) => { //acessa lista de clientes armazenadas
        for(let agenda of val.Agendas) { //foreach de toda a agenda
          this.idClient = agenda.id_cliente; //coloca o client id
          this.aux = 0;
          for(let agendaClient of this.ListaDeCliente) {
            console.log(agendaClient.id_cliente)
            if(agendaClient.id_cliente == this.idClient) {this.aux++; alert(1)}
          }

          if(this.aux == 0) { //nao existe o cliente na lista
            this.Arrayaux.push(agenda) //add na lista
          }
        }
        this.listClient = this.Arrayaux;
        console.log(this.Arrayaux)
      })*/

      this.storage.get('agenda').then((val) => { //acessa lista de clientes armazenadas
        //console.log(val.Agendas[0].id_cliente)
        //console.log(val)
        if(val == null) {
          let alert = this.alertCtrl.create({
            title: 'ERRO',
            subTitle: 'Não existem agendas para serem exibidas.',
            buttons: ['OK']
          });
          alert.present();
        }

      })

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChoseClientPage');
    this.ReturnListClient();
    var nome = window.localStorage.getItem('name_coletor');
      console.log(nome)
  }

  //metodo responsavel por salvar dados do cliente escolhido
  public ChoseClient(obj): void {
    window.localStorage.setItem('id_client', obj.id_cliente);
    window.localStorage.setItem('name_client', obj.nome_cliente);
    console.log(obj)
    this.navCtrl.push(ChoseCollectTypePage)
    //alert(clientId)
    //this.navCtrl.setRoot(ListCollectPage, {}, { animate: true, animation: "enter" });
    //this.storage.set('agendaId', id) //salva id da coleta para
    //this.navCtrl.push(ListCollectPage, {agendaId: id, obj:obj})
    //this.GoCollectPage(obj)
  }

  public GoCollectPage (obj) : void {
    if(obj.id_modalidade == 1) {
      this.navCtrl.push(WaterCollectPage, {obj:obj})
    }

    if(obj.id_modalidade == 4 || obj.id_modalidade == 5 || obj.id_modalidade == 6) {
      this.navCtrl.push(AlimentCollectPage, {
        tipo: obj.id_modalidade, obj : obj
      })
    }

    if(obj.id_modalidade == 3) {
      this.navCtrl.push(SwabCollectPage, {obj: obj})
    }

    if(obj.id_modalidade == 2) {
      this.navCtrl.push(CosmeticCollectPage, {obj: obj})
    }

  }




  //V3.0
  //generate list client
  public ReturnListClient () {
    var used=[]; var use = 0; var list = [];
    this.storage.get('agenda').then((val) => { //acessa lista de clientes armazenadas
      if(val != null) {
        for(let agenda of val.Agendas) {
          use = 0;
          for(let add of used) {
            if(add == agenda.id_cliente) {use++;}
          }
          if(use == 0){
            list.push(agenda);
            used.push(agenda.id_cliente);
          }
        }
        this.listClient = list
        console.log(list)
      }
    });
  }
}
