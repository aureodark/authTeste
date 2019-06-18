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
  public color = Array('primary', 'secondary', 'danger');
  public names = Array('Rock', 'Samba', 'Pop');
  public boliano: boolean = false;
  public i: number = 0;
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

  clicou(nome: string) {

    let tam = this.category.length

    if (this.i == tam) {

      console.log('Impossivel inserir novas categorias');

    } else {

      this.categorias[this.i] = nome;

      this.i = this.i + 1;

      console.log(this.categorias);

    }

  }
  // add back when alpha.4 is out
  // navigate(item) {
  //   this.router.navigate(['/list', JSON.stringify(item)]);
  // }
}
