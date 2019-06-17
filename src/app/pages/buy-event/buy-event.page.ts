import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { LoadingController, ToastController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { Profile } from 'src/app/interface/profile';
import { Event } from 'src/app/interface/event';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-buy-event',
  templateUrl: './buy-event.page.html',
  styleUrls: ['./buy-event.page.scss'],
})
export class BuyEventPage implements OnInit {
  public profile: Profile = {};
  public event: Event = {};
  private loading: any;
  user: Observable<Profile[]>;
  private userCollection: AngularFirestoreCollection<Profile>;

  constructor(
    private authService: AuthService,
    private afa: AngularFireAuth,
    private afs: AngularFirestore,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private router: Router,
    private activatedRoute: ActivatedRoute,
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
        console.log(this.event);
      });

  }

  async comprarIngresso() {
    await this.presentLoading();
    try {
      this.userCollection = this.afs.collection<Profile>('Events/' + this.event.uid + '/listaUsers');
      this.user = this.userCollection.valueChanges();
      this.userCollection.add(this.profile);
      this.event.quantIngressos = this.event.quantIngressos - 1;
      
      console.log(this.userCollection);
      console.log(this.user);
      console.log(this.event);
      console.log(this.event.quantIngressos);
      
      
      
      
      /*const newUser = Array(this.profile,this.profile);
      this.event.listaUsers = newUser;
      
      await this.afs.collection('Events').doc(this.event.uid).update(this.event);

      /*await this.afs.collection('Events').doc(this.event.uid).update(this.event);*/
      /*this.router.navigate(["home"]);*/
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
