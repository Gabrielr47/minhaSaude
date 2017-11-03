import { PacientesProvider } from './../../providers/pacientes/pacientes';
import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { GlobalProvider } from './../../providers/global/global';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
/*
Aba de informações pessoais
O caso de uso tem o objetivo de persistir as informações básicas do paciente (foto,
altura, peso, convênio, estado civil, endereço, e-mail, telefone, profissão, escolaridade, registro do SUS e tipo sanguíneo).
*/

@IonicPage()
@Component({
  selector: 'page-info-pessoal',
  templateUrl: 'info-pessoal.html',
})
export class InfoPessoalPage {
  @ViewChild('fileInp') fileInput: ElementRef;
  displayName: string;
  page: any;

  user = {
    uid: "",
    foto: "./assets/images/profile.jpg",
    nome: "",
    cpfCnpj: "",
    telefoneResidencial: "",
    telefoneCelular: "",
    email: "",
    endereco: "",
    registro_sus: "",
    convenio: "",
    sexo: "",
    estatoCivil: "",
    tiposanguineo: "",
    altura: "",
    peso: "",
    profissao: "",
    escolaridade: "",
  };

  private pacienteForm: FormGroup;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private global: GlobalProvider,
    private pacientes: PacientesProvider,
    private formBuilder: FormBuilder,
    public toastCtrl: ToastController) {

    this.pacienteForm = this.formBuilder.group({
      nome: ['', Validators.required],
      cpfCnpj: [''],
      telefoneResidencial: [''],
      telefoneCelular: [''],
      email: [''],
      endereco: [''],
      registroSus: [''],
      convenio: [''],
      sexo: [''],
      estatoCivil: [''],
      tiposanguineo: [''],
      altura: [''],
      peso: [''],
      profissao: [''],
      escolaridade: [''],
    });

  }

  ionViewDidLoad() {
    this.global.getCurrentUser().then((user) => {
      if (user) {
        this.getPacienteByUid(user.uid);
      } else {
        this.navCtrl.setRoot('HomePage');
      }
    });
  }

  getPacienteByUid(uid) {
    this.pacientes.getPacienteByUid(uid).subscribe(user => {
      if (user.foto == "") {
        user.foto = this.user.foto;
      }
      this.user = user;
    }, error => {
      this.showMessage("Ops ocorreu algum erro ao localizar o paciente.");
    });
  }

  salvarPaciente(user) {
    this.pacientes.setPacienteByUid(user).subscribe(data => {
      this.showMessage("Dados atualizados com sucesso");
    },error =>{
      this.showMessage("Ops ocorreu algum erro, não foi possivel atualizar o paciente.");
    });
  }

  uploadFoto(event) {
    this.readThis(event.target);
  }

  readThis(inputValue: any): void {
    var file: File = inputValue.files[0];
    var myReader: FileReader = new FileReader();

    myReader.onloadend = (e) => {
      this.user.foto = myReader.result;
    }
    myReader.readAsDataURL(file);
  }

  clickUploadFoto() {
    this.fileInput.nativeElement.click();
  }

  showMessage(m) {
    let toast = this.toastCtrl.create({
      message: m,
      showCloseButton: true,
      closeButtonText: 'Ok'
    });
    toast.present();
  }
}
