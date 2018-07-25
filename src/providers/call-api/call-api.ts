import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { LoadingController } from 'ionic-angular/components/loading/loading-controller';
import { AlertController } from 'ionic-angular';

@Injectable()
export class CallApiProvider {
  public loadingCtrl: LoadingController
  private alertCtrl: AlertController
  //host = "http://192.168.10.221:8080/webserver/prd/scpa/";
  host = window.localStorage.getItem('host')
  data: any;

  constructor(public http: Http) {
    this.data = null;
  }

  choseHost(loading) {
    return new Promise(resolve => {
      var url = 'http://www.inffoc.com.br/qualiagua/meuip.php';
      this.http.get(url)
        .map(res => res.json())
        .subscribe(data => {
          this.data = data;
          if(this.data.ip == '187.115.154.122') {
            window.localStorage.setItem('host', "http://192.168.10.221:8080/webserver/tst/scpa/");
          } else {
            window.localStorage.setItem('host', "http://www.qualiagua.com:8080/webserver/tst/scpa/");
          }
          //loading.dismiss()
          resolve(this.data);
          //alert(data.access_token)
        },
        err => {
          console.log(err);
          loading.dismiss()
          let alert = this.alertCtrl.create({
            title: 'Erro',
            subTitle: 'Erro ao Estabelecer conexão com o servidor.',
            buttons: ['Dismiss']
          });
          alert.present();

        });
    });
  }


  choseHost_noLoading() {
    return new Promise(resolve => {
      var url = 'http://www.inffoc.com.br/qualiagua/meuip.php';
      this.http.get(url)
        .map(res => res.json())
        .subscribe(data => {
          this.data = data;
          if(this.data.ip == '187.115.154.122') {
            window.localStorage.setItem('host', "http://192.168.10.221:8080/webserver/tst/scpa/");
          } else {
            window.localStorage.setItem('host', "http://www.qualiagua.com:8080/webserver/tst/scpa/");
          }
          //loading.dismiss()
          resolve(this.data);
          //alert(data.access_token)
        },
        err => {
          console.log(err);
          let alert = this.alertCtrl.create({
            title: 'Erro',
            subTitle: 'Erro ao Estabelecer conexão com o servidor.',
            buttons: ['Dismiss']
          });
          alert.present();

        });
    });
  }

  getAccessToken(loading) { // recebe token de acesso ao server

    return new Promise(resolve => {
      let host = window.localStorage.getItem('host')
      var url = host + 'token';
      var params = { username: '605bb46cf6f6b9123791c3dda35f88df80ac7c76',
      password: 'cdcde7951e0fcc17a05cd93c515d7bec549095b9'};
      this.http.post(url, params)
        .map(res => res.json())
        .subscribe(data => {
          this.data = data;
          console.log(data);
          resolve(this.data);
          window.localStorage.setItem('accessToken', data.access_token)
          //alert(data.access_token)
        },
        err => {
          console.log(err);
          loading.dismiss()
          let alert = this.alertCtrl.create({
            title: 'Erro',
            subTitle: 'Erro ao comunicar com o servidor, verifique sua conexão.',
            buttons: ['Dismiss']
          });
          alert.present();

        });
    });
  }



  login(user, pass) { // recebe token de acesso ao server

    return new Promise(resolve => {
      let host = window.localStorage.getItem('host')
      var url = host + 'login'
      var headers = new Headers();
      headers.append("Authorization", window.localStorage.getItem('accessToken'));
      let options = new RequestOptions({ headers: headers });
      var params = { user: user, passwd: pass};
      this.http.post(url, params, options)
        .map(res => res.json())
        .subscribe(data => {
          this.data = data;
          console.log(this.data);
          resolve(this.data);

        },
        err => {
          console.log(err);
          let alert = this.alertCtrl.create({
            title: 'Erro',
            subTitle: 'Erro ao comunicar com o servidor, verifique sua conexão.',
            buttons: ['Dismiss']
          });
          alert.present();
        });
    });
  }

  getListColector() { // retorna lista de coletores

    return new Promise(resolve => {
      let host = window.localStorage.getItem('host')
      var url = host + 'coletores'
      var headers = new Headers();
      headers.append("Authorization", window.localStorage.getItem('accessToken'));
      let options = new RequestOptions({ headers: headers });

      this.http.get(url, options)
        .map(res => res.json())
        .subscribe(data => {
          this.data = data;
          //console.log(data.Coletores);
          resolve(this.data.Coletores);
          console.log(this.data.Coletores)

        },
        err => {
          console.log(err);
          let alert = this.alertCtrl.create({
            title: 'Erro',
            subTitle: 'Erro ao comunicar com o servidor, verifique sua conexão.',
            buttons: ['Dismiss']
          });
          alert.present();
        });
    });
  }

  getAgendaColetor(id) { // retorna lista de coletores
    let host = window.localStorage.getItem('host')
    return new Promise(resolve => {
      var url = host + 'agendas/'+id
      var headers = new Headers();
      headers.append("Authorization", window.localStorage.getItem('accessToken'));
      let options = new RequestOptions({ headers: headers });

      this.http.get(url, options)
        .map(res => res.json())
        .subscribe(data => {
          //console.log(data.Agendas)
          this.data = data;
          resolve(this.data);
        },
        err => {
          console.log(err);
          let alert = this.alertCtrl.create({
            title: 'Erro',
            subTitle: 'Erro ao comunicar com o servidor, verifique sua conexão.',
            buttons: ['Dismiss']
          });
          alert.present();
        });
    });
  }



  sendCollect(obj, loading) { // recebe token de acesso ao server
    let host = window.localStorage.getItem('host')
    return new Promise(resolve => {
      var url = host + 'amostras'
      var headers = new Headers();
      headers.append("Authorization", window.localStorage.getItem('accessToken'));
      let options = new RequestOptions({ headers: headers });
      var params = obj;
      this.http.post(url, params, options)
        .map(res => res.json())
        .subscribe(data => {
          this.data = data;
          console.log(data);
          resolve(this.data);

        },
        err => {
          console.log(err);
          resolve({status:404})
          loading.dismiss()
          let alert = this.alertCtrl.create({
            title: 'Erro',
            subTitle: 'Erro ao comunicar com o servidor, verifique sua conexão.',
            buttons: ['OK']
          });
          alert.present();


        });


        //alert('Ocorreu um erro ao enviar os dados ao servidor. Acione a equipe de suporte.')
    });
  }

}
