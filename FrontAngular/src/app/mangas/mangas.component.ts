import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-mangas',
  templateUrl: './mangas.component.html',
  styleUrls: ['./mangas.component.css']
})
export class MangasComponent implements OnInit {
  mangas : any;
  constructor(private api: ApiService) { }

  ngOnInit() {
    this.api.get('manga').subscribe((response: any) => {
      console.log(response)
      this.mangas = response;
// this.mangas = response;
    })
  }

}
