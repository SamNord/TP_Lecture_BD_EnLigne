import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-mangas-admin',
  templateUrl: './list-mangas-admin.component.html',
  styleUrls: ['./list-mangas-admin.component.scss']
})
export class ListMangasAdminComponent implements OnInit {
  mangas: any = [];
  constructor(private api: ApiService, private router: Router) { }

  ngOnInit() {
    this.api.get('manga').subscribe((response: any) => {
      this.mangas = response;
    })
  }

  DeleteManga = (id) => {

    this.api.delete('Manga/delete/' + id).subscribe((res: any) => {
      if (res) {
        alert(res.message);
this.router.navigate(['form']);
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

  Retour = () => {
    this.router.navigate(["form"]);
  }

}
