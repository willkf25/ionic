import { AlimentCollectPage } from './../aliment-collect/aliment-collect';
import { SwabCollectPage } from './../swab-collect/swab-collect';
import { Component } from '@angular/core';
import { IonicPage, MenuController, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { WaterCollectPage } from './../water-collect/water-collect';
import { CosmeticCollectPage } from '../cosmetic-collect/cosmetic-collect';


@IonicPage()
@Component({
  selector: 'page-list-collect',
  templateUrl: 'list-collect.html',
})
export class ListCollectPage {
  public id_cliente = null
  public name_coletor = null
  public name_client = null
  public type_id = null
  public type_name = null
  public id_matriz = null
  public name_matriz = null

  public collected = [];
  /*public pointsCollect = [
    {id: 1, nome: 'Água'},
    {id: 2, nome: 'Swab'},
    {id: 3, nome: 'Alimento'},
    {id: 4, nome: 'RN'}
  ]*/
  public pointsCollect = []
  public pointsCollectClient = []
  public clienteId = null // salva o id do cliente
  public list_collect:any
  agenda : any

  constructor(public navCtrl: NavController,
    public menuCtrl : MenuController,
    public navParams: NavParams,
    private storage: Storage) {

    this.menuCtrl.enable(true); // ativa menu
    /*this.storage.get('clienteId').then((val) => {this.clienteId=val})
    this.storage.get('agenda').then((val) => { //acessa agenda
      //this.pointsCollect = val.Agendas
      for(let obj of val.Agendas) {
        console.log(obj)
        if(obj.id_cliente == this.clienteId){

          //caso o id seja igual do cliente escolhido
          this.pointsCollect=val.Agendas
          this.pointsCollectClient.push(obj)
        }
        this.pointsCollect = this.pointsCollectClient //popula lista
      }
    })*/
    this.type_id = window.localStorage.getItem('id_type')
    //this.GoCollectPage(this.agenda)

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ListCollectPage');
    var nome = window.localStorage.getItem('name_coletor'); //load operator
    this.name_coletor = nome //set operator in view
    var nome = window.localStorage.getItem('name_coletor'); //load operator
    this.name_client = nome //set operator in view
    var cliente = window.localStorage.getItem('name_client');
    this.name_client = cliente

    var id_cliente = window.localStorage.getItem('id_client');
    this.id_cliente = id_cliente;

    this.id_matriz = window.localStorage.getItem('id_matriz')
    this.name_matriz = window.localStorage.getItem('matriz')

    if(this.type_id == 1) {
      this.type_name = "AMOSTRA DE ÁGUA"
    }
    if(this.type_id == 4) {
      this.type_name = "ALIMENTOS FABRICADOS"
    }
    if(this.type_id == 2) {
      this.type_name = "COSMÉTICOS/HIGIENIE"
    }
    if(this.type_id == 3) {
      this.type_name = "SWAB/LAV. DE EMB"
    }
    if(this.type_id == 5) {
      this.type_name = "ALIMENTOS PREPARADOS"
    }
    if(this.type_id == 6) {
      this.type_name = "ALIMENTOS BENEFICIADOS"
    }
    this.create_array_colecteds()
    this.ReturnListCollet()

  }

  //update after collect
  ionViewWillEnter() { //logo q entra
    var update = this.navParams.get('update');
    //alert(update)
    if(update == 1) {
      this.create_array_colecteds()
      this.ReturnListCollet()
    }
  }

  public GoCollectPage (obj) : void {
    if(obj.id_modalidade == 1) {
      this.navCtrl.push(WaterCollectPage, {obj:obj})
    }

    if(obj.id_modalidade == 2 ) {
      this.navCtrl.push(CosmeticCollectPage, {
        tipo: obj.id_modalidade, obj : obj
      })
    }

    if(obj.id_modalidade == 3) {
      this.navCtrl.push(SwabCollectPage, {obj: obj})
    }

    if(obj.id_modalidade == 4 || obj.id_modalidade == 5 || obj.id_modalidade == 6) {
      this.navCtrl.push(AlimentCollectPage, {
        tipo: obj.id_modalidade, obj : obj
      })
    }



  }

  //metodo responsavel por salvar dados do cliente escolhido
  public ChoseClient(obj): void {
    //window.localStorage.setItem('id_client', obj.id_cliente);
    //window.localStorage.setItem('name_client', obj.nome_cliente);
    //console.log(obj)
    //this.navCtrl.push(ChoseCollectTypePage)
    //alert(clientId)
    //this.navCtrl.setRoot(ListCollectPage, {}, { animate: true, animation: "enter" });
    //this.storage.set('agendaId', id) //salva id da coleta para
    //this.navCtrl.push(ListCollectPage, {agendaId: id, obj:obj})
    this.GoCollectPage(obj)

  }




  public ReturnListCollet () {
    var list = [];
    console.log('ID MATRIZ: '+ this.id_matriz + ' IDMODALIDADE'+this.type_id + ' ID CLIENTE' + this.id_cliente)
    this.storage.get('agenda').then((val) => { //acessa lista de clientes armazenadas
      if(val != null) {
        console.log(val)
        for(let agenda of val.Agendas) {

          if(agenda.id_matriz == this.id_matriz && agenda.id_modalidade == this.type_id && agenda.id_cliente == this.id_cliente){
              let sl = this.verify_collected(agenda.id)
              console.log(sl)
              agenda.collected = this.verify_collected(agenda.id)
              list.push(agenda);

          }
        }
        this.list_collect = list
        console.log(this.list_collect )

      }
    });
  }


  create_array_colecteds () {
    this.storage.get('coletas').then((val) => {
      this.collected = val
    })
  }

  verify_collected (id) { //1 collected | 0 no

    if(this.collected == undefined || this.collected == null) {return 0;}
    if(this.collected.length == 0) {return 0; }

    var retorno = 0
    for (let coleta of this.collected) {
      console.log(coleta.id_agenda + ' e o id é ' + id)
      if(coleta.id_agenda == id) {retorno=1;}
    }
    return retorno
  }

}
