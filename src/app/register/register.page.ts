import { Component, OnInit } from '@angular/core';
import { User } from '../interface/user';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  public user: User = {} ;
  constructor() { }

  ngOnInit() {
  }

}
