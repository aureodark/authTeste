import { Component, OnInit, ViewChild } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';

import { IonSlides, LoadingController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { User } from '../interface/user';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  @ViewChild(IonSlides) slides: IonSlides;
  public confPassword: string;
  private loading: any;
  public userRegister: User = {};
  public userLogin: User = {};

  constructor(
    private afa: AngularFireAuth,
    private afs: AngularFirestore,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit() {
  }

  segmentChanged(event: any) {
    if (event.detail.value === 'login') {
      this.slides.slidePrev();
    } else {
      this.slides.slideNext();
    }
  }

  async login() {
    await this.presentLoading();

    try {
      await this.authService.login(this.userLogin);
      this.presentToast("Logado com sucesso!");
      this.router.navigate(["home"]);

    } catch (error) {
      console.log(error.code);

      let message: string;

      switch (error.code) {

        case 'auth/argument-error':
          message = 'E-mail ou senha inválida.';
          break;
        case 'auth/invalid-email':
          message = 'E-mail inválido.';
          break;
        case 'auth/wrong-password':
          message = 'Senha inválida';
          break;
        case 'auth/user-not-found':
          message = 'E-mail não existe.';
          break;
        case 'auth/too-many-requests':
          message = 'Muitas solicitações, aguarde...'
          break;
      }

      this.presentToast(message);



    } finally {
      this.loading.dismiss();
    }
  }


  async register() {
    await this.presentLoading();
    try {
      if (this.userRegister.password == this.confPassword) {
        await this.authService.register(this.userRegister);

        this.presentToast("Cadastro Efetuado!");
        this.router.navigate(["register"]);

      } else {
        this.presentToast("Senhas não conferem!");
      }

    } catch (error) {

      let message: string;

      switch (error.code) {

        case 'auth/email-already-in-use':
          message = 'Essa conta já existe!';
          break;
        case 'auth/argument-error':
          message = 'E-mail ou senha inválida.';
          break;
        case 'auth/weak-password':
          message = 'Senha muito curta.';
          break;
        case 'auth/invalid-email':
          message = 'E-mail inválido.';
          break;
      }

      this.presentToast(message);
      console.log(error);
    } finally {
      this.loading.dismiss();

    }
  }

  async presentLoading() {
    this.loading = await this.loadingCtrl.create({ message: 'Aguarde...' });
    return this.loading.present();
  }

  async presentToast(message: string) {
    const toast = await this.toastCtrl.create({ message, duration: 3000 });
    toast.present();
  }
}
