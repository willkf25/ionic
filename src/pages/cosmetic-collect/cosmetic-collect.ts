import { Storage } from '@ionic/storage';
import { Component } from '@angular/core';
import { IonicPage, MenuController, NavController, NavParams, AlertController } from 'ionic-angular';
import { ChoseClientPage } from '../chose-client/chose-client';




@IonicPage()
@Component({
  selector: 'page-cosmetic-collect',
  templateUrl: 'cosmetic-collect.html',
})
export class CosmeticCollectPage {
  public collectType = null;

  public agenda: any;

  data;
  public TypeCollect;
  public utilizacao = []
  public title = "cosmético"; //define qual title da página, se é alimento ou cosmético


  Cutilizacao;

  auxIdArray = 0
  idArray // usado no upload

  //V1.2 3-3-18
  Camostra
  Cfabricacao
  Cvalidade
  Cmarca
  Cfornecedor
  Clocalamostragem
  Clote
  //Ctempamostra
  Cobs
  CidAmostra

  labelData_fabricacao


  Ctamanho
  labelData_fabricacao_placeholder

  public temperatura = [
    { id: 1, nome: '10' },
    { id: 2, nome: '20' },
    { id: 3, nome: '30' },
    { id: 0, nome: 'OUTRO' }
  ]

  public dataReceive : any; //salva obj de dados ja coletados
  public DataColetado = 0; //marca se ja foi coletado os dados
  dataDaColeta
  constructor(public menuCtrl: MenuController,
    public navCtrl: NavController,
    public navParams: NavParams,
    private alertCtrl: AlertController,
    public storage: Storage) {
    this.menuCtrl.enable(false)
    this.collectType = navParams.get("collectType")

    this.agenda = navParams.get("obj") //lista da agenda
    //get for json
    this.labelData_fabricacao = this.agenda.labelfabricacao
    this.Camostra = this.agenda.amostra
    this.labelData_fabricacao_placeholder = this.agenda.place
    //end load for json


    var utilizacaoCosmeticos = [
      { id: "matéria prima.", nome: 'matéria prima.' },
      { id: "base semielaborada para uso em cosméticos.", nome: 'Base semielab. p/ uso em cosm.' },
      { id: "produto higiênico descartável de uso externo.", nome: 'Prod. hig. desc. de uso ext.' },
      { id: 0, nome: 'OUTRO' }
    ]

    var utilizacaoAlimentos = [
      { id: "alimento pronto para o consumo.", nome: 'alim. pronto para o consumo.' },
      { id: "alimento pronto para o consumo, congelado.", nome: 'alim. pronto p/ o consumo, cong.' },
      { id: "alimento pronto para o consumo, refrigerado.", nome: 'alim. pronto p/ o consumo, refrigerado.' },
      { id: "produto acabado.", nome: 'produto acabado.' },
      { id: "resíduos/fino.", nome: 'resíduos/fino.' },
      { id: "gelado comestível.", nome: 'gelado comestível.' },
      { id: "fruta “in natura” inteira.", nome: 'fruta “in natura” inteira.' },
      { id: "farinha de peixe.", nome: 'farinha de peixe.' },
      { id: "pescado “in natura”, refrigerado.", nome: 'pescado “in natura”, refrigerado.' },
      { id: "pescado “in natura”, congelada.", nome: 'pescado “in natura”, congelada.' },
      { id: "carcaça de ave “in natura”, refrigerada.", nome: 'carcaça de ave “in natura”, refrigerada.' },
      { id: "carcaça de ave “in natura”, congelada.", nome: 'carcaça de ave “in natura”, congelada.' },
      { id: "miúdos de ave “in natura”, refrigerada.", nome: 'miúdos de ave “in natura”, refrigerada.' },
      { id: "miúdos de ave “in natura”, congelada.", nome: 'miúdos de ave “in natura”, congelada.' },
      { id: "cortes de ave “in natura”, refrigerada.", nome: 'cortes de ave “in natura”, refrigerada.' },
      { id: "cortes de ave “in natura”, congelada.", nome: 'cortes de ave “in natura”, congelada.' },
      { id: 0, nome: 'OUTRO' }
    ]

    this.TypeCollect = navParams.get("tipo") // recebe o tipo\
    if (this.TypeCollect == 2) {

      this.utilizacao = utilizacaoCosmeticos
      this.title = "cosméticos"
    } else {
      this.utilizacao = utilizacaoAlimentos

    }


    //busca se o dado já é coletado
    this.storage.get('coletas').then((val) => {
      if (val != null) {
        for(let obj of val){
          if(obj.id_agenda == this.agenda.id) {
            //popula os campos
            this.dataReceive = val
            this.Cutilizacao = obj.utilizacao

            if(obj.auxAlimentUtilizacaoOutro == 1) {
              this.Cutilizacao = 0

            }

            this.idArray = this.auxIdArray
            this.DataColetado = 1;

            //V1.2 3-3-18
            this.Camostra = obj.amostra
            this.Cfabricacao = obj.fabricacao
            this.Cvalidade = obj.validade
            this.Cmarca = obj.marca
            this.Cfornecedor = obj.fornecedor
            this.Clocalamostragem = obj.localamostragem
            this.Clote = obj.lote
            //this.Ctempamostra = obj.tempamostra
            this.Cobs = obj.agua_obs
            //this.Cswab_temp_branco = obj.temp_branco

            this.Ctamanho = obj.tamanho
            this.CidAmostra = obj.idAmostra
            this.dataDaColeta = obj.data_coleta


          }
          this.auxIdArray++
        }
      }
    })


  }



  ionViewDidLoad() {
    console.log('ionViewDidLoad CosmeticCollectPage');
  }

  ionViewWillLeave() { //clicou no return
    console.log("Saiu da pagina");
    this.menuCtrl.enable(true) // ativa menu
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

  public Salvar() {
    if (this.Camostra == undefined || this.Cfabricacao == undefined || this.CidAmostra == undefined || this.dataDaColeta == undefined) {
      let alert = this.alertCtrl.create({
        title: 'Erro',
        subTitle: 'Preencha todos os campos',
        buttons: ['Cancelar']
      });
      alert.present();
    } else {
      if(this.valid_data_coleta() == false) {return 0;}

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
        agua_obs: this.Cobs,
        swab_clinica: null,
        swab_higienizacao: null,
        swab_area: null,
        swab_inicio: null,
        swab_tempo: null,
        swab_vazao: null,
        swab_placa: null,
        temp_branco: null,
        material: null,
        utilizacao: this.Cutilizacao,

        auxAlimentUtilizacaoOutro: null ,
        auxAlimentTempBrancoOutro: null,

        auxWaterProcedenciaOutro: 0,
        auxWaterTratamentoOutro: 0,
        auxWaterUtilizacaoOutro: 0,
        auxWaterDosadorOutro: 0,

        auxSwabClinicaOutros: null,
        auxSwabAuxArea: null,


        //V1.2 - 3-3-18
        amostra: this.Camostra,
        fornecedor : this.Cfornecedor,
        envase: null,
        fabricacao: this.Cfabricacao,
        validade: this.Cvalidade,
        //tempamostra: this.Ctempamostra,
        clorolivre: null,

        lote: this.Clote,

        marca: this.Cmarca,
        localamostragem : this.Clocalamostragem,

        tamanho: this.Ctamanho,

        idAmostra: this.CidAmostra
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
          //storage.remove('piquetesLog')

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
      if (this.Camostra == undefined || this.Cfabricacao == undefined || this.CidAmostra == undefined || this.dataDaColeta == undefined) {
        let alert = this.alertCtrl.create({
          title: 'Erro',
          subTitle: 'Preencha todos os campos',
          buttons: ['Cancelar']
        });
        alert.present();
      } else {
        if(this.valid_data_coleta() == false) {return 0;}
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
          agua_obs: this.Cobs,
          swab_clinica: null,
          swab_higienizacao: null,
          swab_area: null,
          swab_inicio: null,
          swab_tempo: null,
          swab_vazao: null,
          swab_placa: null,
          temp_branco: null,
          material: null,
          utilizacao: this.Cutilizacao,

          auxAlimentUtilizacaoOutro: null ,
          auxAlimentTempBrancoOutro: null,

          auxWaterProcedenciaOutro: 0,
          auxWaterTratamentoOutro: 0,
          auxWaterUtilizacaoOutro: 0,
          auxWaterDosadorOutro: 0,

          auxSwabClinicaOutros: null,
          auxSwabAuxArea: null,


          //V1.2 - 3-3-18
          amostra: this.Camostra,
          fornecedor : this.Cfornecedor,
          envase: null,
          fabricacao: this.Cfabricacao,
          validade: this.Cvalidade,
          //tempamostra: this.Ctempamostra,
          clorolivre: null,

          lote: this.Clote,

          marca:this.Cmarca,
          localamostragem : this.Clocalamostragem,

          tamanho: this.Ctamanho,
          idAmostra: this.CidAmostra
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


}
