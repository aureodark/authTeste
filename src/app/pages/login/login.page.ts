import { Component, OnInit, ViewChild } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';

import { auth } from 'firebase/app';
import { IonSlides, LoadingController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { User } from '../../interface/user';
import { AuthService } from '../../service/auth.service';
import { Profile } from 'src/app/interface/profile';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  @ViewChild(IonSlides) slides: IonSlides;
  private loading: any;
  public userLogin: User = {};
  public userUid: any;
  public profile: Profile = {};

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
      this.userLogin = {};
      this.presentToast("Bem vindo!");
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


  async loginG() {
    try {
      await this.afa.auth.signInWithPopup(new auth.GoogleAuthProvider())
        .then(
          res => {
            this.userUid = res.user.uid
            console.log(this.userUid);

          })

      this.authService.getUser(this.userUid).subscribe(
        res => {
          this.profile = res;
          console.log(this.profile);
          if (this.profile == undefined) {
            console.log('Register');
            this.router.navigate(['register']);

          } else {
            console.log('Home');
            this.router.navigate(['home']);

          }
        }
      )

    } catch (error) {
      console.log(error);

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
