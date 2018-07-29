import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {NgAwsS3CrudModule} from './ng-aws-s3-crud/ng-aws-s3-crud.module';

@NgModule({
  declarations: [
    AppComponent
    
  ],
  imports: [
    BrowserModule,
    NgAwsS3CrudModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
