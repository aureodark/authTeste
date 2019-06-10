import { Component, OnInit } from '@angular/core';
import { User } from '../../interface/user';
import { AuthService } from '../../service/auth.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Profile } from '../../interface/profile';
import { Router } from '@angular/router';
import { ToastController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  public profile: Profile = {};
  private loading: any;

  constructor(
    private authService: AuthService,
    private afa: AngularFireAuth,
    private afs: AngularFirestore,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private router: Router

  ) {
    this.afa.user.subscribe((res => {
      this.profile.uid = res.uid;
      this.profile.email = res.email;
    }));
    
    
  }

  ngOnInit() {
  }

  async register() {
    await this.presentLoading();
    try {
      const newProfile = Object.assign({}, this.profile);
      await this.authService.addUser(this.profile.uid, newProfile);
      this.presentToast("Bem vindo " + this.profile.nome + " " + this.profile.sobrenome + " !");
      this.router.navigate(["home"]);
    } catch (error) {
      console.error(error);
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
