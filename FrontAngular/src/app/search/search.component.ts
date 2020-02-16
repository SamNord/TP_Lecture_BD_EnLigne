import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  mangas: any;
  mot;
  valueOption;


  constructor(private api: ApiService) { }

  ngOnInit() {

  }


  Search = () => {

    if (this.valueOption == "Titre") {
      this.api.get('manga/search/titre/' + this.mot).subscribe((res: any) => {
        if (res.length > 0) {
          this.mangas = res;
        }
        else {
          alert(res.message);
        }
      })
    }
    else if (this.valueOption == "Auteur") {
      this.api.get('manga/search/auteur/' + this.mot).subscribe((response: any) => {
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
