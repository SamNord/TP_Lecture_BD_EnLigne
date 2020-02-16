import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  mangas: any;
  titre;
  auteur;
  constructor(private api: ApiService) { }

  ngOnInit() {
  }

  Search = () => {
    if (this.titre != null) {
      this.api.get('manga/search/titre/' + this.titre).subscribe((res: any) => {
        if (res.length > 0) {
          this.mangas = res;
        }
        else {
          alert(res.message);
        }
      })
    }
    else if(this.auteur != null) {
      this.api.get('manga/search/auteur/' + this.titre).subscribe((response: any) => {
        if (response.length > 0) {
          this.mangas = response;
        }
        else {
          alert(response.message);
        }
      })
    }

  }

}
