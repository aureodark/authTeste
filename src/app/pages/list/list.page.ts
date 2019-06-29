import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-list',
  templateUrl: 'list.page.html',
  styleUrls: ['list.page.scss']
})
export class ListPage implements OnInit {


  /*
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
  public items: Array<{ title: string; note: string; icon: string }> = [];*/

  constructor(
    private storage: AngularFireStorage
  ) {

    /*  for (let i = 1; i < 11; i++) {
        this.items.push({
          title: 'Item ' + i,
          note: 'This is item #' + i,
          icon: this.icons[Math.floor(Math.random() * this.icons.length)]
        });
      }*/





  }





  ngOnInit() {
  }



  downloadURL: Observable<string>;

  uploadFile(event: any) {
    const file = event.target.files[0];
    const filePath = '/img/';
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);
    task.snapshotChanges().pipe(finalize(() => this.downloadURL = fileRef.getDownloadURL())).subscribe()
  }



  /*ngOnInit() {
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
  // }*/
}
