import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AuthGuard } from './guard/auth.guard';
import { LoggedGuard } from './guard/logged.guard';
import { AuthService } from './service/auth.service';
import { auth } from 'firebase';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  public logado: boolean = true;
  public appPages = [
    {
      title: 'Home',
      url: '/home',
      icon: 'home'
    },
    {
      title: 'List',
      url: '/list',
      icon: 'list'
    }
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private afa: AngularFireAuth,
    private statusBar: StatusBar,
    public authGuard: AuthGuard,
    public loggedGuard: LoggedGuard,
    public authService: AuthService,
    private router: Router
  ) {
    this.initializeApp();
    this.afa.user.subscribe((id => {
      if (id == null) {

      } else {
        this.logado = false;
      }
    }));
  }

  sair() {
    this.authService.logout();
    this.logado = true;
    this.router.navigate(["home"]);
  }
  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}
