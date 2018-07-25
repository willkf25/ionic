import { CosmeticCollectPage } from './../cosmetic-collect/cosmetic-collect';
import { Component } from '@angular/core';
import { IonicPage, MenuController, NavController, NavParams, AlertController } from 'ionic-angular';
//import { ListCollectPage } from '../list-collect/list-collect';
import { Storage } from '@ionic/storage';
import { WaterCollectPage } from '../water-collect/water-collect';
import { AlimentCollectPage } from '../aliment-collect/aliment-collect';
import { SwabCollectPage } from '../swab-collect/swab-collect';
import { ListCollectPage } from '../list-collect/list-collect';
import { MatrizListPage } from '../matriz-list/matriz-list';

@IonicPage()
@Component({
  selector: 'page-chose-collect-type',
  templateUrl: 'chose-collect-type.html',
})
export class ChoseCollectTypePage {
  public name_coletor = null;
  public name_client = null


  public collect_watter = 0
  public collect_cosmetic = 0
  public collect_aliment_fabricado = 0
  public collect_aliment_preparado = 0
  public collect_aliment_beneficiado = 0
  public collect_swab = 0

  public client_id


  constructor(public menuCtrl: MenuController,
    public navCtrl: NavController,
    public navParams: NavParams,
    private storage: Storage,
    private alertCtrl: AlertController,

  ) {
      this.menuCtrl.enable(true); //Ativa o menu

  }
  ionViewDidLoad() {
    this.client_id = window.localStorage.getItem('id_client');

    console.log('ionViewDidLoad ChoseCollectTypePage');
    var nome = window.localStorage.getItem('name_coletor'); //load operator
    this.name_coletor = nome //set operator in view
    var nome = window.localStorage.getItem('name_coletor'); //load operator
    this.name_client = nome //set operator in view
    var cliente = window.localStorage.getItem('name_client');
    this.name_client = cliente
    this.ReturnListTypeCollet();
  }

  chose_category (category_id) {
//alert(category_id)
    this.client_id = window.localStorage.getItem('id_client');
    this.navCtrl.push(MatrizListPage, {id_type: category_id})
  }

  public ReturnListTypeCollet () {
    this.storage.get('agenda').then((val) => { //acessa lista de clientes armazenadas
      if(val != null) {
        console.log(val.Agendas)
        for(let agenda of val.Agendas) {


          if(agenda.id_cliente == this.client_id){
            if(agenda.id_modalidade == 1) {this.collect_watter++;}
            if(agenda.id_modalidade == 2) {this.collect_cosmetic++;}
            if(agenda.id_modalidade == 3) {this.collect_swab++;}
            if(agenda.id_modalidade == 4) {this.collect_aliment_fabricado++;}
            if(agenda.id_modalidade == 5) {this.collect_aliment_preparado++;}
            if(agenda.id_modalidade == 6) {this.collect_aliment_beneficiado++;}

          }
        }


      }
    });
  }

}
