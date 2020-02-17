import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-images',
  templateUrl: './add-images.component.html',
  styleUrls: ['./add-images.component.css']
})
export class AddImagesComponent implements OnInit {
  id: any = undefined;
  formData = new FormData();
  num;
  manga;
  images;
  isModifImage = false;
  isMangaExist = false;
  constructor(private api: ApiService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.api.observableAddImages.subscribe((value) => {
      console.log(value)
      this.num = value;
    })

    if (this.route.snapshot.params.id != undefined) {
      this.api.get('manga/' + this.route.snapshot.params.id).subscribe((res: any) => {
        console.log(res);
        this.num = res.id;
      })
    }

  }

  UploadImg = (event) => {
    return this.formData.append('image', event.target.files[0]);
  }

  AddImage = (event) => {
    event.preventDefault();
    this.api.get('manga/' + this.num).subscribe((response: any) => {

      if (response != null) {

        this.formData.append('manga', response);
        this.api.upload('Manga/upload/image/' + this.num, this.formData).subscribe((res: any) => {
          if (res.imageId > 0) {
            alert(res.message);
            this.images = response.images;
          }
          else {
            alert(res.message);
          }
        })

      }
      else {
        alert("aucun manga à ce numéro");
      }
    })
  }

  Afficher = () => {
    this.api.get('manga/' + this.num).subscribe((res: any) => {
      if (res != null) {
        this.isMangaExist = true;
        this.manga = res;
      }
      else {
        alert("pas de manga à ce numéro");
      }

    })
  }

  Retour = () => {
    this.router.navigate(['form']);
  }

  UpdateImage = (id) => {
console.log(id)
    // this.isModifImage = true;
    // this.api.observableUpdateImage.next(id);
  }

  Update = () => {
    this.api.observableUpdateImage.subscribe(value => {
    this.images.forEach(element => {
      if (element.id == value) {
        this.api.put('manga/update/image/' + value, element).subscribe((res: any) => {
          if (res) {
            alert(res);
          }
          else {
            alert(res);
          }
        })
      }
    });
    })
  }

  SeeImages = () => {
    this.api.get('manga/' + this.num).subscribe((res : any)=> {
      if(res != null) {
        this.images = res.images;
      }
    })
  }
}
