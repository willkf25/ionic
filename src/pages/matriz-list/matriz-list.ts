import { AlimentCollectPage } from './../aliment-collect/aliment-collect';
import { SwabCollectPage } from './../swab-collect/swab-collect';
import { Component } from '@angular/core';
import { IonicPage, MenuController, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { WaterCollectPage } from './../water-collect/water-collect';
import { ListCollectPage } from '../list-collect/list-collect';



@IonicPage()
@Component({
  selector: 'page-matriz-list',
  templateUrl: 'matriz-list.html',
})
export class MatrizListPage {
  public id_cliente = null
  public name_coletor = null
  public name_client = null
  public type_id = null
  public type_name = null

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
    var type_id = navParams.get("id_type") //lista da agenda
    this.type_id = type_id
    window.localStorage.setItem('id_type', this.type_id)
    //this.GoCollectPage(this.agenda)

  }

  ionViewDidLoad() {
    this.create_array_colecteds()
    console.log('ionViewDidLoad ListCollectPage');
    var nome = window.localStorage.getItem('name_coletor'); //load operator
    this.name_coletor = nome //set operator in view
    var nome = window.localStorage.getItem('name_coletor'); //load operator
    this.name_client = nome //set operator in view
    var cliente = window.localStorage.getItem('name_client');
    this.name_client = cliente

    var id_cliente = window.localStorage.getItem('id_client');
    this.id_cliente = id_cliente;

    if(this.type_id == 1) {
      this.type_name = "Água"
    }
    if(this.type_id == 4) {
      this.type_name = "Alimentos fabricado"
    }
    if(this.type_id == 5) {
      this.type_name = "Alimentos preparados"
    }
    if(this.type_id == 6) {
      this.type_name = "Alimentos beneficiados"
    }
    if(this.type_id == 2) {
      this.type_name = "Cosméticos"
    }
    if(this.type_id == 3) {
      this.type_name = "Swab"
    }

    this.ReturnListCollet()
    this.create_array_colecteds()

  }

  public GoCollectPage (obj) : void {
    window.localStorage.setItem('id_matriz', obj.id_matriz)
    window.localStorage.setItem('matriz', obj.matriz)
    this.navCtrl.push(ListCollectPage);

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
    var used=[]; var use = 0; var list = [];
    this.storage.get('agenda').then((val) => { //acessa lista de clientes armazenadas
      console.log(val.Agendas)
      if(val != null) {


        for(let agenda of val.Agendas) {
          use = 0;
          if(agenda.id_cliente == this.id_cliente && agenda.id_modalidade == this.type_id){

            for(let add of used) {
              if(add == agenda.id_matriz) {use++;}
            }
            if(use == 0){
              ///agenda.collected = this.verify_collected(agenda.id)
              list.push(agenda);
              used.push(agenda.id_matriz);
            }
            console.log(agenda)
          }
        }
        this.list_collect = list
        console.log(list)
      }
    });
  }


  create_array_colecteds () {
    this.storage.get('coletas').then((val) => {
      this.collected.push(val)
    })
  }

  /* VERIFICA SE TODAS AS COLETAS DE UMA MATRIZ FORAM FEITAS */
  /* PARAMS: id = id da matriz
  *
  *
  */
 verify_collected (id) {



 }




  /* FUNÇÃO DO FURLAN

  verify_collected (id) { //1 collected | 0 no

    for (let c of this.collected) {
      for (let coleta of c) {
        if(coleta.id_agenda == id) {return 1;}
        else {return 0}
      }
    }
  }
  */

}
