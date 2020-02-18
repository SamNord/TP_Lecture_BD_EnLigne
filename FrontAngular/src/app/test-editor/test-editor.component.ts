import { Component, OnInit } from '@angular/core';
import { CKButtonDirective } from 'ng2-ckeditor/ckbutton.directive';
import { CKEditor4 } from 'ckeditor4-angular/ckeditor';

@Component({
  selector: 'app-test-editor',
  templateUrl: './test-editor.component.html',
  styleUrls: ['./test-editor.component.css']
})
export class TestEditorComponent implements OnInit {
valeurTexte;
isSee = false;
  public onChange( event: CKEditor4.EventInfo ) {
    
this.valeurTexte = event;
 
    console.log(event);
}
  constructor() { }

  ngOnInit() {

  }

 get = () => {
this.isSee = true;
 }
}
