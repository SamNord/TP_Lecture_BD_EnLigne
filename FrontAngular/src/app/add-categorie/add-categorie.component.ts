import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Router, ActivatedRoute } from '@angular/router';
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
  constructor(private api: ApiService, private router: Router, private route: ActivatedRoute) { }
  categorie;
  ngOnInit() {
    this.api.get('categorie').subscribe((res: any) => {
      this.listCat = res;
    })

    this.api.get('categorie/' + this.route.snapshot.params.id).subscribe((response: any) => {
      this.id = response.id;
      this.cat = response.type;
    })


  }

  AddCat = (event) => {
    event.preventDefault();
    const categorie = { Type: this.cat };
    if (this.id == undefined) {
      this.api.post('categorie/Add', categorie).subscribe((res: any) => {
        // this.id = res.catId;
        if(res.catId > 0) {
          alert("catégorie ajoutée")        
        }
        else {
          alert("échec")
        }
        // this.listCat.forEach(element => {
        //   if (categorie.Type != res.cat.type) {
        //     if (res.catId > 0) {
        //       alert(res.message);
        //       this.isCatExist = true;
        //     }
        //     else {
        //       alert(res.message);
        //     }
        //   }
        //   else {
        //     alert("cette catégorie existe déjà");
        //     this.deleteCat(res.catId);
        //   }
        // });
      })
    }
    //modification
    else {
      this.api.put('categorie/update/' + this.id, categorie).subscribe((response: any) => {
        if (response.idCat > 0) {
          alert(response.message);
        }
        else {
          alert("échec");
        }
      })
    }
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
    this.router.navigate(["form"]);
  }

}
