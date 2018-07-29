import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-fileupload',
  templateUrl: './fileupload.component.html',
  styleUrls: ['./fileupload.component.scss']
})
export class FileuploadComponent implements OnInit {

  selectedFiles:FileList;
  constructor() { }

  ngOnInit() {
  }


  //Event listners

  selectFile(event:any){
    this.selectedFiles=event.target.files;
  }
  upload(){

  }

}
