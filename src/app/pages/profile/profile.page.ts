import { Component, OnInit } from '@angular/core';
import { Profile } from '../../interface/profile';
import { AuthService } from '../../service/auth.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { ToastController, LoadingController, IonToggle } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  public profile: Profile = {};
  private loading: any;
  public userUid: string;
  public verdade: any = true;

  constructor(
    private authService: AuthService,
    private afa: AngularFireAuth,
    private afs: AngularFirestore,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private router: Router,
  ) {


  }

  ngOnInit() {

    this.afa.user.subscribe((id => {
      this.authService.getUser(id.uid).subscribe(
        res => {
          this.profile = res;
          this.profile.uid = id.uid;
        });
    }));

  }



  onChanged(event: any) {
    this.verdade = event.detail.checked;
    if (this.verdade === true) {
      this.ngOnInit();
    }
  }

  async editUser() {
    try {
      await this.authService.editUser(this.profile.uid, this.profile);
      this.presentToast("Dados atualizados com sucesso!");
      this.router.navigate(["home"]);
    } catch (error) {
      console.error(error);
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
