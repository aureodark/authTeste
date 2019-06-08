import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from '../interface/user';
import { Observable } from 'rxjs';
import { auth } from 'firebase/app';
import { AngularFirestore } from '@angular/fire/firestore';
import { Profile } from '../interface/profile';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public user: User;
  public profile: Profile;
  constructor(
    private afa: AngularFireAuth,
    private afs: AngularFirestore
  ) { }

  login(user: User) {
    return this.afa.auth.signInWithEmailAndPassword(user.email, user.password);
  }

  register(user: User) {
    return this.afa.auth.createUserWithEmailAndPassword(user.email, user.password);
  }

  logout() {
    return this.afa.auth.signOut();
  }

  getAuth() {
    return this.afa.auth;
  }

  getUser(uid: string) {
    return this.afs.collection("Users").doc(uid).valueChanges();
  }

  editUser(uid: string, profile) {
    return this.afs.doc('Users/' + uid).update(profile);
  }
}