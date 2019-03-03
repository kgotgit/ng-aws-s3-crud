import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileuploadComponent } from './fileupload/fileupload.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
@NgModule({
  imports: [
    CommonModule,
   
    ReactiveFormsModule 
  ],
  declarations: [FileuploadComponent],
  exports:[FileuploadComponent, FormsModule, ReactiveFormsModule]
})
export class NgAwsS3CrudModule { }
