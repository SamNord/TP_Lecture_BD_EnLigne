import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-detail-categorie',
  templateUrl: './detail-categorie.component.html',
  styleUrls: ['./detail-categorie.component.css']
})
export class DetailCategorieComponent implements OnInit {
  id;
  listMangas;
  type;
  constructor(private api: ApiService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    if (this.route.snapshot.params.id != undefined) {
      this.api.get('categorie/' + this.route.snapshot.params.id).subscribe((res: any) => {
        console.log(res);
        this.id = res.id;
        this.type = res.type;
        this.api.get('manga/search/byCategory/' + res.id).subscribe((response: any) => {
          if (response.length > 0)
            this.listMangas = response;   
            console.log(response)
        })
        
      })
    } 
  }

  updateCat = (id) => {
    this.router.navigate(['update/cat/' + id]);
  }

  deleteCat = (id) => {
    this.api.delete('categorie/delete/' + id).subscribe((response: any) => {
      if (response) {
        alert(response.message);
        this.router.navigate(['cate']);
      }
      else {
        alert(response.message);
        this.router.navigate(['cate']);
      }
    })
  }

  
  Retour = () => {
    this.router.navigate(['form']);
  }

}
