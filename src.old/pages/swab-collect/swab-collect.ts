import { Storage } from '@ionic/storage';
import { Component } from '@angular/core';
import { AlertController, IonicPage, MenuController, NavController, NavParams } from 'ionic-angular';
import { ChoseClientPage } from '../chose-client/chose-client';



@IonicPage()
@Component({
  selector: 'page-swab-collect',
  templateUrl: 'swab-collect.html',
})
export class SwabCollectPage {
  public agenda: any;

  data;

  Cswab_clinica = 1; //campo de coleta
  Cswab_clinicaOutros; //campo de coleta
  auxClinicaOutro = 0;

  Cswab_higienizacao; //campo de coleta - esse n tem outros

  Cswab_area = 1; //campo de coleta
  Cswab_areaOutros;
  auxArea

  Ctemp_branco

  Cswab_inicio

  Cswab_tempo

  Cswab_vazao

  Cswab_placa

  auxIdArray = 0
  idArray // usado no upload

  // V1.2 3-3-18
  Cswab_amostra
  Cswab_lote
  Cswab_validade
  obs
  Cswab_idAmostra
  dataDaColeta

  public analise = [
    { id: "Uma amostra de swab ambiental,", nome: 'Swab ambiental,' },
    { id: "Uma amostra de swab utensílio(s),", nome: 'Swab utensílio(s),' },
    { id: "Uma amostra de swab superfície de utensílio(s),", nome: 'Swab superfície de utensílio(s),' },
    { id: "Uma amostra de swab equipamento,", nome: 'Swab equipamento,' },
    { id: "Uma amostra de swab superfície,", nome: 'Swab superfície,' },
    { id: "Uma amostra de swab manipulador,", nome: 'Swab manipulador,' },
    { id: "Uma amostra de swab de embalagem,", nome: 'Swab de embalagem,' },
    { id: "Uma amostra de swab de pool de embalagem,", nome: 'Swab de pool de embalagem,' },
    { id: "Uma unidade de amostra de embalagem.", nome: 'Unidade de amostra de embalagem.' },
    { id: 0, nome: 'OUTRO' },
  ]

  public higiniziacao = [
    { id: "com limpeza.", nome: 'com limpeza.' },
    { id: "sem limpeza.", nome: 'sem limpeza.' }
  ]

  public area = [
    { id: "SIM", nome: 'Sim' },
    { id: "NÃO", nome: 'Não' },
    /*{ id: "300", nome: '300' },
    { id: "400", nome: '400' },
    { id: "500", nome: '500' },
    { id: 0, nome: 'OUTRO' },*/
  ]

  public dataReceive : any; //salva obj de dados ja coletados
  public DataColetado = 0; //marca se ja foi coletado os dados


  constructor(public menuCtrl: MenuController,
    public navCtrl: NavController,
    public navParams: NavParams,
    private alertCtrl: AlertController,
    public storage : Storage) {
    this.menuCtrl.enable(false) // desatia\va menu
    this.agenda = navParams.get("obj") //lista da agenda
    //get for json
    this.Cswab_amostra = this.agenda.amostra
    //end load for json


    //busca se o dado já é coletado
    this.storage.get('coletas').then((val) => {
      if (val != null) {
        for(let obj of val){
          if(obj.id_agenda == this.agenda.id) {
            //popula os campos
            console.log(obj)
            this.dataReceive = val
            this.Cswab_clinica = obj.swab_clinica;
            this.Cswab_higienizacao = obj.swab_higienizacao;
            this.Cswab_area = obj.swab_area
            this.Cswab_inicio = obj.swab_inicio
            this.Cswab_tempo = obj.swab_tempo
            this.Cswab_vazao = obj.swab_vazao
            this.Cswab_placa = obj.swab_placa
            this.Ctemp_branco = obj.temp_branco
            this.Cswab_amostra = obj.amostra
            this.Cswab_lote = obj.lote
            this.Cswab_validade = obj.validade
            this.obs = obj.agua_obs,
            this.Cswab_idAmostra = obj.idAmostra
            this.dataDaColeta = obj.data_coleta

            if(obj.auxSwabClinicaOutros == 1) {
              this.Cswab_clinica = 0
              this.Cswab_clinicaOutros = obj.swab_clinica
            }
            if(obj.auxSwabAuxArea == 1) {
              this.Cswab_area = 0
              this.Cswab_areaOutros = obj.swab_area
            }
            this.idArray = this.auxIdArray;
            console.log("Index = " + this.auxIdArray)
            this.DataColetado = 1;
          }
          this.auxIdArray++
        }
      }
    })

  }

  public valid_data_coleta () {
    var dataDaColeta = new Date(this.dataDaColeta)
    var now = new Date
    if(dataDaColeta   > now) {
      let alert = this.alertCtrl.create({
        title: 'Erro',
        subTitle: 'O campo de data não pode ser maior que a data e hora atual',
        buttons: ['Cancelar']
      });
      alert.present();
      return false
    }

    dataDaColeta.setHours(dataDaColeta.getHours() - 3); // Adiciona 2 horas
    var data = dataDaColeta.toISOString()
    var ArrayData = data.split('.')
    var finalData = ArrayData[0]
    var arrayFinalData = finalData.split(':')
    this.data = arrayFinalData[0] + ':' + arrayFinalData[1]
    console.log(arrayFinalData)

    return true
  }


  Save() {
    if (this.Cswab_tempo == undefined  || this.Cswab_area == undefined || this.Cswab_clinica == undefined || this.Cswab_inicio == undefined || this.Cswab_placa == undefined
      || this.Cswab_amostra == undefined || this.Cswab_lote == undefined || this.Ctemp_branco == undefined || this.Cswab_idAmostra == undefined || this.dataDaColeta == undefined) {
      let alert = this.alertCtrl.create({
        title: 'Erro',
        subTitle: 'Preencha todos os campos',
        buttons: ['Cancelar']
      });
      alert.present();
    } else {
      if(this.valid_data_coleta() == false) {return 0;}

      if (this.Cswab_clinica == 0) { this.Cswab_clinica = this.Cswab_clinicaOutros; this.auxClinicaOutro = 1; }
      if (this.Cswab_area == 0) { this.Cswab_area = this.Cswab_areaOutros; this.auxArea = 1; }

      var coleta = {
        id_agenda: this.agenda.id,
        id_modalidade: this.agenda.id_modalidade,
        id_coletor: window.localStorage.getItem("id_coletor"),
        data_coleta: this.data,
        agua_procedencia: null,
        agua_tratamento: null,
        agua_bebedouro_sujo: null,
        agua_bebedouro_enferrujado: null,
        agua_bebedouro_filtro: null,
        agua_bebedouro_esguicho: null,
        agua_dosador: null,
        agua_obs: this.obs,
        swab_clinica: this.Cswab_clinica,
        swab_higienizacao: this.Cswab_higienizacao,
        swab_area: this.Cswab_area,
        swab_inicio: this.Cswab_inicio,
        swab_tempo: this.Cswab_tempo,
        swab_vazao: this.Cswab_vazao,
        swab_placa: this.Cswab_placa,
        temp_branco: this.Ctemp_branco,
        material: null,
        utilizacao: null,

        auxAlimentUtilizacaoOutro: null,
        auxAlimentTempBrancoOutro:null,

        auxWaterProcedenciaOutro: null,
        auxWaterTratamentoOutro: null,
        auxWaterUtilizacaoOutro: null,
        auxWaterDosadorOutro: null,

        auxSwabClinicaOutros: this.auxClinicaOutro,
        auxSwabAuxArea: this.auxArea,

        //V1.2 - 3-3-18
        amostra: this.Cswab_amostra,
        fornecedor : null,
        envase: null,
        fabricacao: null,
        validade: this.Cswab_validade,
        tempamostra: null,
        clorolivre: null,

        lote: this.Cswab_lote,

        marca:null,
        localamostragem : null,

        tamanho: null,
        idAmostra: this.Cswab_idAmostra

      }

      //salva no array
      this.storage.get('coletas').then((val) => {

        if (val == null) {
          var coletas = new Array();
          //insere no array
          coletas.push(coleta)
          console.log('cria array')
          this.storage.set('coletas', coletas)
        } else {
          console.log("existe o vetor")
          //insere no array
          val.push(coleta)
          this.storage.set('coletas', val)
        }

        let alert = this.alertCtrl.create({
          title: 'Sucesso',
          subTitle: 'Dados salvos com sucesso',
          buttons: ['OK']
        });
        alert.present();
        //this.navCtrl.setRoot(ChoseClientPage, {}, { animate: true, animation: "enter" });
        this.navCtrl.getPrevious().data.update = '1';
        this.navCtrl.pop();
      })

    }
  }

  update (index) {
    this.storage.get('coletas').then((val) => {
      if (this.Cswab_tempo == undefined  || this.Cswab_area == undefined || this.Cswab_clinica == undefined || this.Cswab_inicio == undefined || this.Cswab_placa == undefined
        || this.Cswab_amostra == undefined || this.Cswab_lote == undefined || this.Ctemp_branco == undefined || this.Cswab_idAmostra == undefined || this.dataDaColeta == undefined) {
        let alert = this.alertCtrl.create({
          title: 'Erro',
          subTitle: 'Preencha todos os campos',
          buttons: ['Cancelar']
        });
        alert.present();
      } else {
        if(this.valid_data_coleta() == false) {return 0;}

        if (this.Cswab_clinica == 0) { this.Cswab_clinica = this.Cswab_clinicaOutros; this.auxClinicaOutro = 1; }
        if (this.Cswab_area == 0) { this.Cswab_area = this.Cswab_areaOutros; this.auxArea = 1; }

        var coleta = {
          id_agenda: this.agenda.id,
          id_modalidade: this.agenda.id_modalidade,
          id_coletor: window.localStorage.getItem("id_coletor"),
          data_coleta: this.data,
          agua_procedencia: null,
          agua_tratamento: null,
          agua_bebedouro_sujo: null,
          agua_bebedouro_enferrujado: null,
          agua_bebedouro_filtro: null,
          agua_bebedouro_esguicho: null,
          agua_dosador: null,
          agua_obs: this.obs,
          swab_clinica: this.Cswab_clinica,
          swab_higienizacao: this.Cswab_higienizacao,
          swab_area: this.Cswab_area,
          swab_inicio: this.Cswab_inicio,
          swab_tempo: this.Cswab_tempo,
          swab_vazao: this.Cswab_vazao,
          swab_placa: this.Cswab_placa,
          temp_branco: this.Ctemp_branco,
          material: null,
          utilizacao: null,

          auxAlimentUtilizacaoOutro: null,
          auxAlimentTempBrancoOutro:null,

          auxWaterProcedenciaOutro: null,
          auxWaterTratamentoOutro: null,
          auxWaterUtilizacaoOutro: null,
          auxWaterDosadorOutro: null,

          auxSwabClinicaOutros: this.auxClinicaOutro,
          auxSwabAuxArea: this.auxArea,

          //V1.2 - 3-3-18
          amostra: this.Cswab_amostra,
          fornecedor : null,
          envase: null,
          fabricacao: null,
          validade: this.Cswab_validade,
          tempamostra: null,
          clorolivre: null,

          lote: this.Cswab_lote,

          marca:null,

          localamostragem : null,

          tamanho: null,
          idAmostra: this.Cswab_idAmostra
        }
        //faz o update
        val[index] = coleta
        //salva
        this.storage.set('coletas', val)
        let alert = this.alertCtrl.create({
          title: 'Sucesso',
          subTitle: 'Dados atualizados com sucesso',
          buttons: ['OK']
        });
        alert.present();
        //this.navCtrl.setRoot(ChoseClientPage, {}, { animate: true, animation: "enter" });
        this.navCtrl.getPrevious().data.update = '1';
        this.navCtrl.pop();
      }
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SwabCollectPage');
  }

  ionViewWillLeave() { //clicou no return
    console.log("Saiu da pagina");
    this.menuCtrl.enable(true) // ativa menu
  }



}
