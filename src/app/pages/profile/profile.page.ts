import { Component, OnInit } from '@angular/core';
import { Profile } from '../../interface/profile';
import { AuthService } from '../../service/auth.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { ToastController, LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  public profile: Profile = {};
  private loading: any;
  public verdade: any = true;

  constructor(
    private authService: AuthService,
    private afa: AngularFireAuth,
    private afs: AngularFirestore,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private router: Router,
    private storage: AngularFireStorage
  ) {


  }

  ngOnInit() {
    this.afa.user.subscribe((id => {
      if (id == null) {

      } else {
        this.authService.getUser(id.uid).subscribe(
          res => {
            this.profile = res;
            this.profile.uid = id.uid;
          });
      }
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
      this.verdade = true;
      this.presentToast("Dados atualizados com sucesso!");
      this.router.navigate(["home"]);
    } catch (error) {
      console.error(error);
    }
  }


  downloadURL: Observable<string>;

  uploadFile(event: any) {
    const file = event.target.files[0];
    const filePath = '/img/';
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);
    task.snapshotChanges().pipe(finalize(() => this.downloadURL = fileRef.getDownloadURL())).subscribe()
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
