import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { LoadingController, ToastController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { Profile } from 'src/app/interface/profile';
import { Event } from 'src/app/interface/event';

@Component({
  selector: 'app-buy-event',
  templateUrl: './buy-event.page.html',
  styleUrls: ['./buy-event.page.scss'],
})
export class BuyEventPage implements OnInit {
  public profile: Profile = {};
  public event: Event = {};
  private loading: any;


  constructor(
    private authService: AuthService,
    private afa: AngularFireAuth,
    private afs: AngularFirestore,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {




    this.afa.user.subscribe((id => {
      this.authService.getUser(id.uid).subscribe(
        res => {
          this.profile = res;
          this.profile.uid = id.uid;
        });
    }));
    let id = this.activatedRoute.snapshot.params['uid'];
    this.afs.collection('Events').doc(id).valueChanges().subscribe(
      res => {
        this.event = res;
      });
  }

  async comprarIngresso() {
    await this.presentLoading();
    try {
      this.event.listaUsers = this.profile;
      /*this.event.uid = this.afs.createId();*/
      const newEvent = Object.assign({}, this.event);
      await this.afs.collection('Events').doc(this.event.uid).set(newEvent);

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
