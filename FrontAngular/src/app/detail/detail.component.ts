import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../api.service';
import { Subject } from 'rxjs';

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
 
  isReading = false;
  detailExist = false;

  constructor(private route: ActivatedRoute, private api: ApiService, private router : Router) { }

  ngOnInit() {
    if (this.route.snapshot.params.id != undefined) {
      this.api.get('manga/' + this.route.snapshot.params.id).subscribe((res: any) => {
        console.log(res);
        this.numero = res.id;
        this.titre = res.titre;
        this.cover = res.urlCover;
        this.auteur = res.auteur;
        this.texte = res.texte;
        this.images = res.images;
        this.detailExist = true;
      })
    }
  }

  Read = () => {
    this.isReading = true;
  }

  AddToFavoris = (id) => {
    this.api.get('manga/add/favoris/' + id).subscribe((res: any) => {
      if (res.length > 0) {
        alert("ajouté");
        this.api.observableFavoris.next(res);
        this.router.navigate(['favoris']);
      }
      else {
        alert("échec");
      }
    })
  }

}
