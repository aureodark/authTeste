import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { LoadingController, ToastController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { Event } from 'src/app/interface/event';
import { toUnicode } from 'punycode';

@Component({
  selector: 'app-view-event',
  templateUrl: './view-event.page.html',
  styleUrls: ['./view-event.page.scss'],
})
export class ViewEventPage implements OnInit {
  public event: Event = {};
  public verdade: any = true;
  public userId: string = null;
  public eventId: string = null;

  private loading: any;
  public boliano = true;


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
    let id = this.activatedRoute.snapshot.params['uid'];
    this.afs.collection('Events').doc(id).valueChanges().subscribe(res => {
      this.event = res;
      this.afa.user.subscribe((res => {
        this.userId = res.uid;
        if (this.userId === this.event.organizador.uid) {
          this.boliano = false;
        } else {
          console.log('Esse não é o criador, então não pode editar, mas pode comprar.');
        }
      }));
    });
  }


  onChanged(event: any) {
    this.verdade = event.detail.checked;
    if (this.verdade === true) {
      this.ngOnInit();
    }
  }

  async editEvent() {
    try {
      await this.authService.editEvent(this.event.uid, this.event);
      this.verdade = true;
      this.presentToast("Dados atualizados com sucesso!");
      this.router.navigate(["home"]);
    } catch (error) {
      console.error(error);
    }
  }

  async deleteEvent() {
    try {
      await this.authService.deleteEvent(this.event.uid);
      this.presentToast("Evento excluído com sucesso!");
      this.router.navigate(["home"]);
    } catch (error) {
      console.error(error);
    }
  }

  buyEvent(uid: string) {
    this.router.navigate(['buy-event/' + uid]);
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
