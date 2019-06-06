import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';

import { IonSlides, LoadingController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { User } from '../interface/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  public user: User = {};
  public confPassword: string;
  private loading: any;

  constructor(
    private afa: AngularFireAuth,
    private afs: AngularFirestore,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private router: Router
  ) { }

  ngOnInit() {
  }

  async register() {
    await this.presentLoading();
    try {
      if (this.user.password == this.confPassword) {
        const newUser = await this.afa.auth.createUserWithEmailAndPassword(this.user.email, this.user.password);
        const newUserObject = Object.assign({}, this.user);
        delete newUserObject.email;
        delete newUserObject.password;
        await this.afs.collection('Users').doc(newUser.user.uid).set(newUserObject);
        this.presentToast("Cadastro Efetuado!");
        
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
          message = 'Usuário ou senha inválida.';
          break;
        case 'auth/weak-password':
          message = 'Senha muito curta.';
          break;
      }

      this.presentToast(message);
      console.log(error);
    } finally {
      this.loading.dismiss();
      this.router.navigate(["register"]);
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
