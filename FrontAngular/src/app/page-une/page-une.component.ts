import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-page-une',
  templateUrl: './page-une.component.html',
  styleUrls: ['./page-une.component.scss']
})
export class PageUneComponent implements OnInit {
mangasSlides;
numero;
categorie;
titre;
cover;
auteur;
  constructor(private api : ApiService, private route : ActivatedRoute, private router : Router) { }

  ngOnInit() {
this.api.get('manga').subscribe((res : any) => {
  this.mangasSlides = res;
})
  }

}
