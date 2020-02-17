import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-favoris',
  templateUrl: './favoris.component.html',
  styleUrls: ['./favoris.component.css']
})
export class FavorisComponent implements OnInit {
favoris;
  constructor(private api : ApiService) { }

  ngOnInit() {

   this.favoris= JSON.parse(localStorage.getItem('myManga'));
   console.log(this.favoris)


  }

}
