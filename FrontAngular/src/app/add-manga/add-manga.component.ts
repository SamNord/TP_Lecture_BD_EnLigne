import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { HttpEventType } from '@angular/common/http';

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

  constructor(private api: ApiService) { }

  ngOnInit() {
  }

  UploadCover = (event) => {
 
    // if (files.length === 0)
      
  return this.formData.append('image', event.target.files[0]);
 
  }

  // Test = () => {
  //   console.log(this.cover);
  // }

  Add = () => {
    const livre = { Titre: this.titre, Auteur: this.auteur, Texte: this.texte, Categorie: this.categorie };


    // console.log(this.formData);
    this.api.post('Manga', livre).subscribe((event: any) => {
      console.log(event);
      this.id = event.numero;
    if(event.numero >0) {
      for (let l in livre) {
        this.formData.append(l, livre[l]);
      }
      this.api.upload('Manga/upload/cover/' + event.numero, this.formData).subscribe((res: any) => {
      if(res.url != null) {
        alert(res.message)
      }
      else {
        alert(res.message);
      }
      })
    }
       
  
    });
  }
}
