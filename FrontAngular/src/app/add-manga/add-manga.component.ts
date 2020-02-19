import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { HttpEventType } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';

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
  formData: FormData = new FormData();
  categories: any;
  catExist = false;
  test;
  isAddManga = false;
  cat;
  testCat;
  isUpdate;
  formDataEdit: FormData;
  listMangas;


  constructor(private api: ApiService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    if (this.route.snapshot.params.id != undefined) {
      this.api.get('manga/' + this.route.snapshot.params.id).subscribe((res: any) => {
        console.log(res);
        this.id = res.id;
        this.titre = res.titre;
        this.auteur = res.auteur;
        this.texte = res.texte;
      })
    }

    //pour parcourir la liste des mangas afin de ne pas ajouter le même titre
    this.api.get('manga').subscribe((response: any) => {

      this.listMangas = response;
    })

    // pour afficher la liste des catégories s'ils existent
    this.api.get('categorie').subscribe((res: any) => {
      this.categories = res;
      if (res.length > 0) {
        this.catExist = true;
      }
    })

    this.api.observableUpdate.subscribe(value => {
      console.log(value)
      this.isUpdate = value;
    })
  
  }

  UploadCover = (event) => {
    return this.formData.append('image', event.target.files[0]);
  }

  Add = () => {

    this.api.get('categorie/search/' + this.cat).subscribe((res: any) => {
      const livre = { Titre: this.titre, Auteur: this.auteur, Texte: this.texte, CategorieId: res.id };
      if (this.id == undefined) {
        this.api.post('Manga', livre).subscribe((event: any) => {

          console.log(event);
          this.id = event.numero;
          this.api.observableAddImages.next(event.numero);
          if (event.numero > 0) {
         
            for (let l in livre) {
              this.formData.append(l, livre[l]);
            }
            this.api.upload('Manga/upload/cover/' + event.numero, this.formData).subscribe((response: any) => {
              if (response != null) {
                alert("manga ajouté");
                let reponse = prompt("Voulez vous ajouter des images ? Y/N");
                if (reponse == "Y" || reponse == "y") {
                  this.router.navigate(['formImages']);
                }
                else {
                  this.router.navigate(['liste']);
                }
              }
              else {
                alert(response.message);
              }
            })
          }
          else {
            alert(event.message);
          }
        });
      }
      else {
        //modification    
        this.api.put('manga/update/' + this.id, livre).subscribe((res: any) => {
          if (res) {

            for (let l in livre) {
              this.formData.append(l, livre[l]);
            }
            console.log(this.formData)
            //modification des images
            this.api.upload('Manga/update/cover/' + this.id, this.formData).subscribe((response: any) => {
              if (response) {
                alert(response.message);
                let question = prompt("voulez-vous modifier les images ? Y/N");
                if (question == "Y" || question == "y") {
                  this.router.navigate(['updateImage/' + this.id])
                }
              }

              else {
                alert("erreur");
              }
            })
          }
          else {
            alert("erreur");
          }
        })
      }

    })
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

  AjouterImages = () => {
    this.router.navigate(['formImages']);
  }

  SeeMangas = () => {
    this.router.navigate(['listmangasAdmin']);
  }

}
