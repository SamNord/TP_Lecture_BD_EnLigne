import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-add-images',
  templateUrl: './add-images.component.html',
  styleUrls: ['./add-images.component.css']
})
export class AddImagesComponent implements OnInit {
  id: any = undefined;
  formData = new FormData();
  num;
  constructor(private api: ApiService) { }

  ngOnInit() {
    this.api.observableAddImages.subscribe((value) => {
      console.log(value)
      this.id = value;
    })
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

}
