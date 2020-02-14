import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-add-categorie',
  templateUrl: './add-categorie.component.html',
  styleUrls: ['./add-categorie.component.css']
})
export class AddCategorieComponent implements OnInit {
  cat;
  id: any = undefined;
  toDelete = false;
  constructor(private api: ApiService) { }

  ngOnInit() {
  }

  AddCat = () => {
    const categorie = { Type: this.cat };
    this.api.post('categorie', categorie).subscribe((res: any) => {
      this.id = res.catId;
    })
  }

  RecupCat = () => {
    this.api.get('categorie').subscribe((res: any) => {
      console.log(res);
      this.api.obsGet.next(res);
    })
  }

}
