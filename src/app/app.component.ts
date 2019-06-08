import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AuthGuard } from './guard/auth.guard';
import { LoggedGuard } from './guard/logged.guard';
import { AuthService } from './service/auth.service';
import { auth } from 'firebase';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
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
    },
    {
      title: 'Login',
      url: '/login',
      icon: 'contact'
    },
    {
      title: 'Profile',
      url: '/profile',
      icon: 'contact'
    }
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public authGuard: AuthGuard,
    public loggedGuard: LoggedGuard,
    public authService: AuthService,
    private router: Router
  ) {
    this.initializeApp();
  }

    sair(){
    this.authService.logout();
    this.router.navigate(["login"]);
  }
  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}
