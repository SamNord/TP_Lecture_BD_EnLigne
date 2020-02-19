import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-list-by-categorie',
  templateUrl: './list-by-categorie.component.html',
  styleUrls: ['./list-by-categorie.component.css']
})
export class ListByCategorieComponent implements OnInit {
  mangas;


  constructor(private api: ApiService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    if (this.route.snapshot.params.cat != undefined) {
      this.api.get('manga/search/byCategory/' + this.route.snapshot.params.cat).subscribe((res: any) => {
        if (res.length > 0)
          this.mangas = res;   
      })
    }
  }

  RetourListe = () => {
    this.router.navigate(['cate'])
  }

}
