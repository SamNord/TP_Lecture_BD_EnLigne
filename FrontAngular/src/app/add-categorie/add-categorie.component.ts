import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-add-categorie',
  templateUrl: './add-categorie.component.html',
  styleUrls: ['./add-categorie.component.css']
})
export class AddCategorieComponent implements OnInit {
  cat;
  id: any = undefined;
  toDelete = false;
  listCat: any;
  isCatExist = false;
  constructor(private api: ApiService, private router: Router) { }
  categorie;
  ngOnInit() {
    this.api.get('categorie').subscribe((res: any) => {
      this.listCat = res;
    })
  }

  AddCat = () => {
    const categorie = { Type: this.cat };
    this.api.post('categorie/Add', categorie).subscribe((res: any) => {
      this.id = res.catId;
      if (res.catId > 0) {
        alert(res.message);
        this.isCatExist = true;
      }
      else {
        alert(res.message);
      }

    })
  }

  deleteCat = (id) => {   
      this.api.delete('categorie/delete/' + id).subscribe((response : any)=> {
        if(response) {
          alert(response.message);
        
        }
        else {
          alert(response.message);
        }
      })      
  }

  Retour = () => {
    this.router.navigate(["form"]);
  }

}
