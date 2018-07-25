import { Storage } from '@ionic/storage';
import { Component } from '@angular/core';
import { IonicPage, MenuController, NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';
import { ChoseClientPage } from '../chose-client/chose-client';



@IonicPage()
@Component({
  selector: 'page-water-collect',
  templateUrl: 'water-collect.html',
})
export class WaterCollectPage {
  public agenda: any;
  CestadoBebedouro = [];
  data;

  Cagua_bebedouro_sujo
  Cagua_bebedouro_enferrujado
  Cagua_bebedouro_filtro
  Cagua_bebedouro_esguicho

  Cagua_id_amostra

  Ctemp_branco

  Cagua_procedencia;
  Cagua_procedenciaOutro
  auxProcedenciaOutro = 0;

  Cutilizacao
  CutilizacaoOutro
  auxUtilizacaoOutro = 0

  Cagua_tratamento
  Cagua_tratamentoOutro
  auxAguaTratamentoOutro = 0

  Cagua_dosador
  Cagua_dosadorOutro
  auxDosadorOutro = 0;

  Cagua_obs


  auxIdArray = 0
  idArray // usado no upload

  //V1.2 - 3-3-18
  Cagua_amostra
  Cagua_fornecedor
  Cagua_data_envase
  Cagua_fabricacao
  Cagua_validade
  Cagua_tempamostra
  Cagua_clorolivre
  dataDaColeta :any

  //alte fields for envase X fabricacao
  public alterFieldFabricacao ($event) {

    if(this.Cagua_fabricacao != undefined || this.Cagua_fabricacao != null) {
      this.Cagua_data_envase = null
      this.Cagua_data_envase = undefined
      this.Cagua_data_envase = ''
    }
  }

  public alterFieldEnvase($event) {


    if(this.Cagua_data_envase != undefined) {
      this.Cagua_fabricacao = null
    }
  }



  public procedencia = [ // array de var procedencia
    { nome: 'POÇO', id: "POÇO" },
    { nome: 'COMPESA', id: "COMPESA" },
    { nome: 'CARRO PIPA', id: "CARRO PIPA" },
    { nome: 'RIO', id: "RIO" },
    { nome: 'CACIMBA', id: "CACIMBA" },
    { nome: 'POÇO + COMPESA', id: "POÇO + COMPESA" },
    { nome: 'ÁGUA MINERAL', id: "ÁGUA MINERAL" },
    { nome: 'CAGECE', id: "CAGECE" },
    { nome: 'FONTE', id: "FONTE" },
    { nome: 'OUTRO', id: 0 },
  ]

  public bebedouroSN = [ // array de var procedencia
    { nome: 'Sim', id: "S" },
    { nome: 'Não', id: "N" }
  ]

  public utilizacao = [
    { nome: 'efluente.', id: "efluente." },
    { nome: 'água.', id: "água." },
    { nome: 'água dest. ao consumo humano', id: "água destinada ao consumo humano." },
    { nome: 'gelo em cubos.', id: "gelo em cubos." },
    { nome: 'solução de diálise na máquina.', id: "solução de diálise na máquina." },
    { nome: 'água para fins de diálise.', id: "água para fins de diálise." },
    { nome: 'água para fins laboratoriais.', id: "água para fins laboratoriais." },
    { nome: 'solução bicarbonato.', id: "solução bicarbonato." },
    { nome: 'solução alcalina.', id: "solução alcalina." },
    { nome: 'solução ácida.', id: "solução ácida." },
    { nome: 'água para fins de recreação.', id: "água para fins de recreação." },
    { nome: 'água para fins de aquicultura.', id: "água para fins de aquicultura." },
    { nome: 'água residuária.', id: "água residuária." },
    { nome: 'água mineral natural.', id: "água mineral natural." },
    { nome: 'água para fins farmacêuticos.', id: "água para fins farmacêuticos." },
    { nome: 'água para fins industriais.', id: "água para fins industriais." },
    { nome: 'OUTRO', id: 0 },
  ]

  public tratamento = [
    { nome: 'TRATADA', id: "TRATADA" },
    { nome: 'NÃO TRATADA', id: "NÃO TRATADA" },
    { nome: 'CLORADA', id: "CLORADA" },
    { nome: 'OUTRO', id: 0 },
  ]

  public bebedouro = [
    { nome: 'Sujo', id: 1 },
    { nome: 'Enferrujado', id: 2 },
    { nome: 'Com filtro Ext.', id: 3 },
    { nome: 'Esguicho quebrado', id: 4 }
  ]

  public dosador = [
    { nome: 'COM CLORO', id: "COM CLORO" },
    { nome: 'SEM CLORO', id: "SEM CLORO" },
    { nome: 'DESATIVADO', id: "DESATIVADO" },

  ]
  labelData_fabricacao = "Data de fabricação"
  labelData_fabricacao_placeholder = "Data de Fabricação"
  public dataReceive: any; //salva obj de dados ja coletados
  public DataColetado = 0; //marca se ja foi coletado os dados

  constructor(public navCtrl: NavController,
    public menuCtrl: MenuController,
    public navParams: NavParams,
    public alertCtrl: AlertController,
    public storage: Storage) {
    console.log(navParams.get("obj")) //lista da agenda
    this.menuCtrl.enable(false); // desabilita Menu

    this.agenda = navParams.get("obj") //lista da agenda
    //get for json
    this.labelData_fabricacao = this.agenda.labelfabricacao
    this.Cagua_amostra = this.agenda.amostra
    this.labelData_fabricacao_placeholder = this.agenda.place
    //end load for json

    //this.data = this.getDate();

    //busca se o dado já é coletado
    this.storage.get('coletas').then((val) => {
      if (val != null) {
        for (let obj of val) {
          if (obj.id_agenda == this.agenda.id) {
            console.log(obj)
            //popula os campos
            this.dataReceive = val
            this.Ctemp_branco = obj.temp_branco
            this.Cagua_procedencia = obj.agua_procedencia
            this.Cagua_tratamento = obj.agua_tratamento
            this.Cagua_bebedouro_sujo = obj.agua_bebedouro_sujo
            this.Cagua_bebedouro_enferrujado = obj.agua_bebedouro_enferrujado
            this.Cagua_bebedouro_filtro = obj.agua_bebedouro_filtro
            this.Cagua_bebedouro_esguicho = obj.agua_bebedouro_esguicho
            this.Cagua_dosador = obj.agua_dosador
            this.Cagua_obs = obj.agua_obs
            this.Cutilizacao = obj.utilizacao
            this.dataDaColeta = obj.data_coleta
            this.Cagua_validade = obj.envase




            if(obj.auxWaterProcedenciaOutro == 1) {
              this.Cagua_procedencia = 0
              this.Cagua_procedenciaOutro = obj.agua_procedencia
            }
            if(obj.auxWaterUtilizacaoOutro == 1) {
              this.Cutilizacao = 0
              this.CutilizacaoOutro = obj.utilizacao
            }
            if(obj.auxWaterTratamentoOutro == 1) {
              this.Cagua_tratamento = 0
              this.Cagua_tratamentoOutro = obj.agua_tratamento
            }
            if(obj.auxWaterDosadorOutro == 1) {
              this.Cagua_dosador = 0
              this.Cagua_dosadorOutro = obj.agua_dosador
            }

            this.idArray = this.auxIdArray
            this.DataColetado = 1;

            //V1.2 - 3-3-18
            this.Cagua_amostra = obj.amostra
            this.Cagua_fornecedor = obj.fornecedor
            this.Cagua_fabricacao = obj.fabricao
            this.Cagua_validade = obj.validade
            this.Cagua_tempamostra = obj.tempamostra
            this.Cagua_clorolivre = obj.clorolivre
            this.Cagua_id_amostra = obj.idAmostra

            this.Cagua_data_envase = obj.envase
            this.Cagua_fabricacao = obj.fabricacao
          }
          this.auxIdArray++
        }
      }
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WaterCollectPage');
  }

  ionViewWillLeave() { //clicou no return
    console.log("Saiu da pagina");
    this.menuCtrl.enable(true) // ativa menu
  }


  public getStatusBebedouro(array) { //percorre o array retornando array com os dados


    for (let obj of array) {
      if (obj == 1) { this.Cagua_bebedouro_sujo = "S" }
      if (obj == 2) { this.Cagua_bebedouro_enferrujado = "S" }
      if (obj == 3) { this.Cagua_bebedouro_filtro = "S" }
      if (obj == 4) { this.Cagua_bebedouro_esguicho = "S" }
    }

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

  /*if(this.Cagua_data_envase == undefined) {
    this.Cagua_data_envase = this.Cagua_fabricacao
  }*/

    if (this.Ctemp_branco == undefined || this.Cagua_amostra == undefined
      || this.Cagua_tempamostra == undefined || this.Cagua_id_amostra == undefined
      || this.dataDaColeta == undefined) {
      let alert = this.alertCtrl.create({
        title: 'Erro',
        subTitle: 'Preencha todos os campos',
        buttons: ['Cancelar']
      });
      alert.present();

        if(this.Cagua_dosador == "COM CLORO" && this.Cagua_clorolivre == undefined) {
          let alert = this.alertCtrl.create({
            title: 'Erro',
            subTitle: 'Preencha todos os campos',
            buttons: ['Cancelar']
          });
          alert.present();
        }


    } else {

      if(this.valid_data_coleta() == false) {return 0;}

      if (this.Cagua_procedencia == 0) { this.Cagua_procedencia = this.Cagua_procedenciaOutro; this.auxProcedenciaOutro = 1; }
      if (this.Cagua_tratamento == 0) { this.Cagua_tratamento = this.Cagua_tratamentoOutro; this.auxAguaTratamentoOutro = 1; }
      if (this.Cagua_dosador == 0) { this.Cagua_dosador = this.Cagua_dosadorOutro; this.auxDosadorOutro = 1; }
      if (this.Cutilizacao == 0) { this.Cutilizacao = this.CutilizacaoOutro; this.auxUtilizacaoOutro = 1;}
      //this.getStatusBebedouro(this.CestadoBebedouro)
      var coleta = {
        id_agenda: this.agenda.id,
        id_modalidade: this.agenda.id_modalidade,
        id_coletor: window.localStorage.getItem("id_coletor"),
        data_coleta: this.data,

        agua_procedencia: this.Cagua_procedencia,
        agua_tratamento: this.Cagua_tratamento,
        agua_bebedouro_sujo: this.Cagua_bebedouro_sujo,
        agua_bebedouro_enferrujado: this.Cagua_bebedouro_enferrujado,
        agua_bebedouro_filtro: this.Cagua_bebedouro_filtro,
        agua_bebedouro_esguicho: this.Cagua_bebedouro_esguicho,
        agua_dosador: this.Cagua_dosador,
        agua_obs: this.Cagua_obs,
        swab_clinica: null,
        swab_higienizacao: null,
        swab_area: null,
        swab_inicio: null,
        swab_tempo: null,
        swab_vazao: null,
        swab_placa: null,
        temp_branco: this.Ctemp_branco,
        material: null,
        utilizacao: this.Cutilizacao,
        auxAlimentUtilizacaoOutro: 0,
        auxAlimentTempBrancoOutro:0,
        auxWaterProcedenciaOutro: this.auxProcedenciaOutro,
        auxWaterTratamentoOutro: this.auxAguaTratamentoOutro,
        auxWaterUtilizacaoOutro: this.auxUtilizacaoOutro,
        auxWaterDosadorOutro: this.auxDosadorOutro,
        auxSwabClinicaOutros: null,
        auxSwabAuxArea: null,

        //V1.2 - 3-3-18
        amostra: this.Cagua_amostra,
        fornecedor : this.Cagua_fornecedor,
        envase: this.Cagua_data_envase,
        fabricacao: this.Cagua_fabricacao,
        validade: this.Cagua_validade,
        tempamostra: this.Cagua_tempamostra,
        clorolivre: this.Cagua_clorolivre,

        lote: null,
        idAmostra: this.Cagua_id_amostra
      }


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
      if (this.Ctemp_branco == undefined || this.Cagua_amostra == undefined
        || this.Cagua_tempamostra == undefined || this.Cagua_id_amostra == undefined
        ||this.dataDaColeta == undefined) {
        let alert = this.alertCtrl.create({
          title: 'Erro',
          subTitle: 'Preencha todos os campos',
          buttons: ['Cancelar']
        });
        alert.present();


        if(this.Cagua_dosador == "COM CLORO" && this.Cagua_clorolivre == undefined) {
          let alert = this.alertCtrl.create({
            title: 'Erro',
            subTitle: 'Preencha todos os campos',
            buttons: ['Cancelar']
          });
          alert.present();
        }



      } else {
        if(this.valid_data_coleta() == false) {return 0;}
        /*if(this.Cagua_data_envase == undefined) {
          this.Cagua_data_envase = this.Cagua_fabricacao
        }*/
        if (this.Cagua_procedencia == 0) { this.Cagua_procedencia = this.Cagua_procedenciaOutro; this.auxProcedenciaOutro = 1; }
        if (this.Cagua_tratamento == 0) { this.Cagua_tratamento = this.Cagua_tratamentoOutro; this.auxAguaTratamentoOutro = 1; }
        if (this.Cagua_dosador == 0) { this.Cagua_dosador = this.Cagua_dosadorOutro; this.auxDosadorOutro = 1; }
        if (this.Cutilizacao == 0) { this.Cutilizacao = this.CutilizacaoOutro; this.auxUtilizacaoOutro = 1;}
        //this.getStatusBebedouro(this.CestadoBebedouro)
        var coleta = {
          id_agenda: this.agenda.id,
          id_modalidade: this.agenda.id_modalidade,
          id_coletor: window.localStorage.getItem("id_coletor"),
          data_coleta: this.data,
          agua_procedencia: this.Cagua_procedencia,
          agua_tratamento: this.Cagua_tratamento,
          agua_bebedouro_sujo: this.Cagua_bebedouro_sujo,
          agua_bebedouro_enferrujado: this.Cagua_bebedouro_enferrujado,
          agua_bebedouro_filtro: this.Cagua_bebedouro_filtro,
          agua_bebedouro_esguicho: this.Cagua_bebedouro_esguicho,
          agua_dosador: this.Cagua_dosador,
          agua_obs: this.Cagua_obs,
          swab_clinica: null,
          swab_higienizacao: null,
          swab_area: null,
          swab_inicio: null,
          swab_tempo: null,
          swab_vazao: null,
          swab_placa: null,
          temp_branco: this.Ctemp_branco,
          material: null,
          utilizacao: this.Cutilizacao,

          auxAlimentUtilizacaoOutro: 0,
          auxAlimentTempBrancoOutro:0,

          auxWaterProcedenciaOutro: this.auxProcedenciaOutro,
          auxWaterTratamentoOutro: this.auxAguaTratamentoOutro,
          auxWaterUtilizacaoOutro: this.auxUtilizacaoOutro,
          auxWaterDosadorOutro: this.auxDosadorOutro,

          auxSwabClinicaOutros: null,
          auxSwabAuxArea: null,

          //V1.2 - 3-3-18
          amostra: this.Cagua_amostra,
          fornecedor : this.Cagua_fornecedor,
          envase: this.Cagua_data_envase,
          fabricacao: this.Cagua_fabricacao,
          validade: this.Cagua_validade,
          tempamostra: this.Cagua_tempamostra,
          clorolivre: this.Cagua_clorolivre,

          lote: null,

          marca:null,
          localamostragem : null,

          tamanho: null,

          idAmostra: this.Cagua_id_amostra
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
