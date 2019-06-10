import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AuthService } from 'src/app/service/auth.service';
import { Profile } from 'src/app/interface/profile';
import { Event } from 'src/app/interface/event';
import { AngularFirestore } from '@angular/fire/firestore';
import { LoadingController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { stringify } from 'querystring';

@Component({
  selector: 'app-event',
  templateUrl: './event.page.html',
  styleUrls: ['./event.page.scss'],
})
export class EventPage implements OnInit {
  public profile: Profile = {};
  public userUid: string;
  public event: Event = {};
  private loading: any;

  constructor(
    private authService: AuthService,
    private afa: AngularFireAuth,
    private afs: AngularFirestore,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private router: Router,

  ) { }

  ngOnInit() {
    this.afa.user.subscribe((id => {
      this.authService.getUser(id.uid).subscribe(
        res => {
          this.profile = res;
          this.profile.uid = id.uid;
        });
    }));
  }


  async addEvent() {
    await this.presentLoading();
    try {
      this.event.organizador = this.profile;
      const newEvent = Object.assign({}, this.event);
      this.event.uid = this.afs.createId();
      await this.afs.collection('Events').doc(this.event.uid).set(newEvent);
      
      this.router.navigate(["home"]);
    } catch (error) {
      console.error(error);
    } finally {
      this.loading.dismiss();
    }
  }

  async exit(){
    this.event = {};
    await this.router.navigate(["home"]);
    
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
