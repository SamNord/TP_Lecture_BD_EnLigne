import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-test-editor',
  templateUrl: './test-editor.component.html',
  styleUrls: ['./test-editor.component.css']
})
export class TestEditorComponent implements OnInit {
  public model = {
    editorData: ''
};
  isSee = false;
  constructor() { }

  ngOnInit() {
    
  }



}
