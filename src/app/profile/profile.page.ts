import { Component, OnInit } from '@angular/core';
import { Profile } from '../interface/profile';
import { AuthService } from '../service/auth.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { ToastController, LoadingController } from '@ionic/angular';
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

  constructor(
    private authService: AuthService,
    private afa: AngularFireAuth,
    private afs: AngularFirestore,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private router: Router
  ) {
    this.afa.user.subscribe((res => {
      this.userUid = res.uid;
      this.authService.getUser(this.userUid).subscribe(
        res => {
          this.profile = res;
        }
      );
    }
    )
    );

  }

  ngOnInit() {




  }

  async editUser() {
    try {
      await this.authService.editUser(this.userUid, this.profile);
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
