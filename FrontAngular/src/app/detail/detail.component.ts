import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../api.service';
import { Subject } from 'rxjs';
import { ParseError } from '@angular/compiler';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {
  titre;
  cover;
  auteur;
  texte;
  images;
  categorie;
  numero;
  monManga;
  liste = [];
  isReading = false;
  detailExist = false;
  isFavorisExist = false;
  tableauFavoris = [];
  desableFavoris : boolean;
  constructor(private route: ActivatedRoute, private api: ApiService, private router: Router) { }

  ngOnInit() {
    if (this.route.snapshot.params.id != undefined) {
      this.api.get('manga/' + this.route.snapshot.params.id).subscribe((res: any) => {
        // console.log(res);
        this.numero = res.id;
        this.titre = res.titre;
        this.categorie = res.categorie.type;
        this.cover = res.urlCover;
        this.auteur = res.auteur;
        this.texte = res.texte;
        this.images = res.images;
        // console.log(res.images)
        this.detailExist = true;
        this.desableFavoris = (!this.VerifFavoris(this.numero)) ? true : false;
      })
    }
   

  }

  Read = (id) => {
    // this.isReading = true;
    this.router.navigate(['lecture/' + id]);
  }

  RetourListe = () => {
    this.router.navigate(['liste']);
  }

  VerifFavoris = (id) => {
    let jsonFavoris = localStorage.getItem('myManga');
    this.tableauFavoris = (jsonFavoris != null) ? JSON.parse(jsonFavoris) : [];

    this.tableauFavoris.forEach(element => {
      this.isFavorisExist = (element.id == id) ? true : false;
    });

    return this.isFavorisExist;
  }

  AddInFavoris = (id: number) => {
    this.api.get('manga/' + id).subscribe((res: any) => {
      let mangasFavoris = res;
      let json = localStorage.getItem('myManga');

      this.tableauFavoris = (json != null) ? JSON.parse(json) : [];
      this.VerifFavoris(id);
    
      this.api.observableFavoris.next(this.desableFavoris);
      if (this.isFavorisExist == false) {
        this.tableauFavoris.push(mangasFavoris);
        alert("ajouté aux favoris");
        this.router.navigate(['favoris']);
      }
      else {
        alert("exite déjà dans la liste des favoris");
      }

      localStorage.setItem('myManga', JSON.stringify(this.tableauFavoris));
    })

  }

}
