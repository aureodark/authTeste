import { Component } from '@angular/core';
import { User } from 'firebase';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Event } from 'src/app/interface/event';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from 'src/app/service/auth.service';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage {
  public event = new Array<Event>();
  public search: string = '';
  public searchResults = new Array<any>();

  constructor(
    private afs: AngularFirestore,
    private router: Router,
    private authService: AuthService
  ) {
    this.afs.collection('Events').valueChanges().subscribe(res => {
      this.event = res;
    });
  }

  evento() {
    this.router.navigate(["event"]);
  }

  viewEvent(uid: string) {
    this.router.navigate(['view-event/' + uid]);
  }

  searchChanged() {
    if (!this.search.trim().length) return;
    this.afs.collection('Events', ref => ref.orderBy('categoria').startAt(this.search).endAt(this.search + '\uf8ff')).valueChanges().subscribe(res => {
      this.searchResults = res;
    });
  }

}
