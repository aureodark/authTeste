import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/interface/category';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-list',
  templateUrl: 'list.page.html',
  styleUrls: ['list.page.scss']
})
export class ListPage implements OnInit {
  public category = new Array<Category>();
  public categorias = Array();

  private selectedItem: any;
  private icons = [
    'flask',
    'wifi',
    'beer',
    'football',
    'basketball',
    'paper-plane',
    'american-football',
    'boat',
    'bluetooth',
    'build'
  ];
  public items: Array<{ title: string; note: string; icon: string }> = [];
  constructor(
    private afs: AngularFirestore
  ) {
    for (let i = 1; i < 11; i++) {
      this.items.push({
        title: 'Item ' + i,
        note: 'This is item #' + i,
        icon: this.icons[Math.floor(Math.random() * this.icons.length)]
      });
    }
  }

  ngOnInit() {
    this.afs.collection('Category').valueChanges().subscribe(res => {
      this.category = res;
      console.log(this.category);
    });
  }

  clicou(nome: string, color: string) {
    let pos = this.categorias.indexOf(nome);
    if (pos >= 0) {
      this.categorias.splice(pos, 1)
      document.getElementById(nome).setAttribute( 'color' , '');
    } else {
      this.categorias.push(nome);
      document.getElementById(nome).setAttribute( 'color' , color);
    }
    console.log(this.categorias);
    
  }
  // add back when alpha.4 is out
  // navigate(item) {
  //   this.router.navigate(['/list', JSON.stringify(item)]);
  // }
}
