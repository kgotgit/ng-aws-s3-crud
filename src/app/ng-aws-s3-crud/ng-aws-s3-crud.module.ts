import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileuploadComponent } from './fileupload/fileupload.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [FileuploadComponent],
  exports:[FileuploadComponent]
})
export class NgAwsS3CrudModule { }
