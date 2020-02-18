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
  numero;
  monManga;
  liste = [];
  isReading = false;
  detailExist = false;


  constructor(private route: ActivatedRoute, private api: ApiService, private router: Router) { }

  ngOnInit() {
    if (this.route.snapshot.params.id != undefined) {
      this.api.get('manga/' + this.route.snapshot.params.id).subscribe((res: any) => {
        // console.log(res);
        this.numero = res.id;
        this.titre = res.titre;
        this.cover = res.urlCover;
        this.auteur = res.auteur;
        this.texte = res.texte;
        this.images = res.images;
        // console.log(res.images)
        this.detailExist = true;
      })
    }
  }

  Read = () => {
    this.isReading = true;
  }

  AddToFavoris = (id) => {
    this.api.get('manga/' + id).subscribe((res: any) => {
      //récupérer ce qui est dans le localStorage et le mettre dans un tableau vide puis
      // on y ajoute la nouvelle donnée dans ce tableau
      this.monManga = res;
      let json = localStorage.getItem('myManga');
      // this.liste = (json != null) ? JSON.parse(json) : [];

      if (json != null) {
        this.liste = JSON.parse(json);
        this.liste.forEach(element => {
          if (element.id != id) {
            this.liste.push(res);
            alert("ajouté aux favoris")
          }
          else {
            alert("ce manga existe déjà dans vos favoris");            
          }
        });
      }
      else {
        this.liste = [];
        this.liste.push(this.monManga);
        alert("ajouté aux favoris");
      }
      //sauvegarde dans le localStorage
      localStorage.setItem('myManga', JSON.stringify(this.liste));
    })
  }

  DeleteManga = (id) => {

    this.api.delete('Manga/delete/' + id).subscribe((res: any) => {
      if (res) {
        alert(res.message);
      }
      else {
        alert("erreur");
      }
    })
  }

  Update = (id) => {
    this.api.observableUpdate.next(true);
    this.router.navigate(['update/' + id]);
  }

}
