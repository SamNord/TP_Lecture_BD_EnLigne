import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-lecture',
  templateUrl: './lecture.component.html',
  styleUrls: ['./lecture.component.css']
})
export class LectureComponent implements OnInit {
  slides;
  numero;
  categorie;
  titre;
  cover;
  auteur;
 

  constructor(private api : ApiService, private route : ActivatedRoute, private router : Router) { }

  ngOnInit() {
    if (this.route.snapshot.params.id != undefined) {
      this.api.get('manga/' + this.route.snapshot.params.id).subscribe((res: any) => {
        // console.log(res);
        this.numero = res.id;
        this.titre = res.titre;
        this.categorie = res.categorie.type;
        this.cover = res.urlCover;
        this.auteur = res.auteur;
        this.slides = res.images;
 
      })
    }
  }

}
