import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the FichaMedicaPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-ficha-medica',
  templateUrl: 'ficha-medica.html',
})
export class FichaMedicaPage {
  fichaMedica:any = "infoPessoal";
  titulo:any = "Informações Pessoais";
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FichaMedicaPage');
  }
  
  segmentChanged(event){

    switch(event.value){
      case 'infoPessoal':
      this.titulo = "Informações Pessoais";
      break;
      case 'endereco':
      this.titulo = "Endereços";
      break;
      case 'parentes':
      this.titulo = "Parentes";
      break;
      case 'alergias':
      this.titulo = "Alergias";
      break;
      default:
      this.titulo = "Informações Pessoais";
    }
    
  }
}