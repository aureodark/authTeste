import { Component, OnInit, ViewChild } from '@angular/core';
import { User } from '../../interface/user';
import { AuthService } from '../../service/auth.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Profile } from '../../interface/profile';
import { Router } from '@angular/router';
import { IonSlides, ToastController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  @ViewChild(IonSlides) slides: IonSlides;
  public profile: Profile = {};
  public userRegister: User = {};
  private loading: any;
  public confPassword: string = '';

  constructor(
    private authService: AuthService,
    private afa: AngularFireAuth,
    private afs: AngularFirestore,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private router: Router

  ) { }

  ngOnInit() { }

  clicou(event: any) {
    if (event.target.innerText == "PRÓXIMO") {
      this.slides.slideNext()
    } else if (event.target.innerText == "VOLTAR") {
      this.slides.slidePrev()
    }
  }

  async register() {
    await this.presentLoading();
    try {
      if (this.userRegister.password == this.confPassword) {
        await this.authService.register(this.userRegister);
        this.profile.email = this.userRegister.email
        const newProfile = Object.assign({}, this.profile);
        this.authService.addUser(newProfile);
        this.presentToast("Bem vindo " + this.profile.nome + " " + this.profile.sobrenome + " !");
        this.router.navigate(["home"]);
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
