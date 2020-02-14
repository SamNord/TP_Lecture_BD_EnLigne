import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { HttpEventType } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-manga',
  templateUrl: './add-manga.component.html',
  styleUrls: ['./add-manga.component.css']
})
export class AddMangaComponent implements OnInit {
  titre: string;
  auteur: string;
  texte: string;
  categorie: string;
  id: any = undefined;
  cover: any;
  formData = new FormData();
  categories: any;
  catExist = false;
  test;
cat;
  constructor(private api: ApiService, private router: Router) { }

  ngOnInit() {
    this.api.get('categorie').subscribe((res: any) => {
      console.log(res);
      this.categories = res;
      if(res.length > 0) {
        this.catExist = true;
      }
      // this.api.obsGet.next(res);
    })
    console.log(this.test)
  }

  UploadCover = (event) => {

    // if (files.length === 0)

    return this.formData.append('image', event.target.files[0]);

  }

  // Test = () => {
  //   console.log(this.cover);
  // }

  Add = () => {
    const livre = { Titre: this.titre, Auteur: this.auteur, Texte: this.texte, Categorie: this.cat };


    // console.log(this.formData);
    this.api.post('Manga', livre).subscribe((event: any) => {
      console.log(event);
      this.id = event.numero;
      if (event.numero > 0) {
        for (let l in livre) {
          this.formData.append(l, livre[l]);
        }
        this.api.upload('Manga/upload/cover/' + event.numero, this.formData).subscribe((res: any) => {
          if (res.url != null) {
            alert(res.message)
          }
          else {
            alert(res.message);
          }
        })
      }
    });
  }

  addMyCategory = () => {
    this.router.navigate(['cate']);
  }





}
