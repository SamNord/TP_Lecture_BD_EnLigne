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
  isAddManga = false;
  cat;
  testCat;
  constructor(private api: ApiService, private router: Router) { }

  ngOnInit() {
    this.api.get('categorie').subscribe((res: any) => {

      this.categories = res;
      if (res.length > 0) {
        this.catExist = true;
      }

    })

  }

  UploadCover = (event) => {


    return this.formData.append('image', event.target.files[0]);

  }

  Add = () => {
  

    // const livre = { Titre: this.titre, Auteur: this.auteur, Texte: this.texte, CategorieId: 1 };

    // this.api.post('Manga', livre).subscribe((event: any) => {
    //   console.log(event);
    //   this.id = event.numero;
    //   if (event.numero > 0) {
    //     for (let l in livre) {
    //       this.formData.append(l, livre[l]);
    //     }
    //     this.api.upload('Manga/upload/cover/' + event.numero, this.formData).subscribe((res: any) => {
    //       if (res.url != null) {
    //         alert(event.message)
    //       }
    //       else {
    //         alert(res.message);
    //       }
    //     })
    //   }
    //   else {
    //     alert(event.message);
    //   }
    // });


    // console.log(this.formData);

  }

  addMyCategory = () => {
    this.router.navigate(['cate']);
  }

  AjouterCategorie = () => {
    this.router.navigate(['cate']);
  }

  AjouterManga = () => {
    this.isAddManga = true;
  }





}
