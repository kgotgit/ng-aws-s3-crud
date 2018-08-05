import { Component, OnInit } from '@angular/core';
import * as AWS from 'aws-sdk';


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

  selectFile(fileInput:any){
    const AWSService = AWS;
    const region = 'us-east-1';
    const bucketName = 'kgotgit-07232018';
    const IdentityPoolId = 'us-east-1:4b607663-1066-46c2-94a5-9244a8a492c3';
    const file = fileInput.target.files[0];
  
  //Configures the AWS service and initial authorization
    AWSService.config.update({
      region: region,
      credentials: new AWSService.CognitoIdentityCredentials({
        IdentityPoolId: IdentityPoolId
      }),
      
    });
  
  //adds the S3 service, make sure the api version and bucket are correct
    const s3 = new AWSService.S3({
      apiVersion: '2006-03-01',
      params: { Bucket: bucketName}
    });
  
  //I store this in a variable for retrieval later
  
  
    s3.upload({ Key: file.name, Bucket: bucketName, Body: file, ACL: 'public-read'}, function (err, data) {
     if (err) {
       console.log(err, 'there was an error uploading your file');
     }
   });
  }
  upload(){

  }

}
