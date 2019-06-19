import { Component, OnInit, ViewChild } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AuthService } from 'src/app/service/auth.service';
import { Profile } from 'src/app/interface/profile';
import { Event } from 'src/app/interface/event';
import { AngularFirestore } from '@angular/fire/firestore';
import { IonSlides, LoadingController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { stringify } from 'querystring';
import { Category } from 'src/app/interface/category';

@Component({
  selector: 'app-event',
  templateUrl: './event.page.html',
  styleUrls: ['./event.page.scss'],
})
export class EventPage implements OnInit {
  @ViewChild(IonSlides) slides: IonSlides;
  public profile: Profile = {};
  public userUid: string = null;
  public event: Event = {};
  private loading: any;
  public contar: number = 0;
  public category = new Array<Category>();
  public categorias = Array();

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
    this.afs.collection('Category').valueChanges().subscribe(res => {
      this.category = res;
    });


  }
  clicou(nome: string, color: string) {
    let pos = this.categorias.indexOf(nome);
    if (pos >= 0) {
      this.categorias.splice(pos, 1)
      document.getElementById(nome).setAttribute('color', '');
    } else {
      this.categorias.push(nome);
      document.getElementById(nome).setAttribute('color', color);
    }
  }

  segmentChanged(event: any) {
    if (event.detail.value === '0') {
      this.slides.slideTo(0);
      this.contar = 0;
    } else if (event.detail.value === '1') {
      this.slides.slideTo(1);
      this.contar = 1;
    } else if (event.detail.value === '2') {
      this.slides.slideTo(2);
      this.contar = 2;
    } else if (event.detail.value === '3') {
      this.slides.slideTo(3);
      this.contar = 3;
    } else if (event.srcElement.innerText === 'VOLTAR') {
      this.slides.slidePrev();
      if (this.contar == 0) {
      } else {
        this.contar = this.contar - 1;
      }
    } else if (event.srcElement.innerText === 'PRÓXIMO') {
      this.slides.slideNext();
      if (this.contar == 3) {
      } else {
        this.contar = this.contar + 1;
      }
    }
  }


  async addEvent() {
    await this.presentLoading();
    try {
      this.event.organizador = this.profile;
      this.event.categorias = this.categorias;
      this.event.uid = this.afs.createId();
      const newEvent = Object.assign({}, this.event);
      await this.afs.collection('Events').doc(this.event.uid).set(newEvent);

      this.router.navigate(["home"]);
    } catch (error) {
      console.error(error);
    } finally {
      this.loading.dismiss();
    }
  }

  async exit() {
    await this.router.navigate(["home"]);
    this.event = {};
    this.slides.slideTo(0);
    this.contar = 0;
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
