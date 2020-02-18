import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-favoris',
  templateUrl: './favoris.component.html',
  styleUrls: ['./favoris.component.css']
})
export class FavorisComponent implements OnInit {
  favoris = [];
  mangas;
  tab = []
  constructor(private api: ApiService) { }

  ngOnInit() {

    this.favoris = JSON.parse(localStorage.getItem('myManga'));
    
    console.log(this.favoris)
  }

  RemoveAtFavoris = (id) => {

    let element = this.favoris.find(elt => elt.id == id)
  let index = this.favoris.indexOf(element)

  this.favoris.splice(index, 1)
  localStorage.setItem('myManga', JSON.stringify(this.favoris)); 
  }
}
