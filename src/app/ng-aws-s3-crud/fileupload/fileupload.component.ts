import { Component, OnInit,ViewChild } from '@angular/core';
import * as AWS from 'aws-sdk';
import { callbackify } from 'util';
import { nextTick } from 'q';


@Component({
  selector: 'app-fileupload',
  templateUrl: './fileupload.component.html',
  styleUrls: ['./fileupload.component.scss']
})
export class FileuploadComponent implements OnInit {

  showSummary:boolean=false;
  @ViewChild("fileInput") nativeFile;
  s3url:string="";
  bucketName:string="";
  fileUploadStaus:string="";
  fileName:string="";
  s3response:any=null;
  allfileslist:any[]=[];
  listObjects=false;
  listLoading:boolean=false;
  fileuploading:boolean=false;


  constructor() { }

  ngOnInit() {
  }


  //Event listners
  resetFileUpload(){
  this.s3url="";
  this.bucketName="";
  this.fileUploadStaus="";
  this.fileName="";
  this.showSummary=false;
  this.listObjects=false;
      this.allfileslist=[];
  }
  triggerFileUpload(){
    this.nativeFile.nativeElement.click();
  }

  selectFile(fileInput:any){
    this.fileuploading=true;
    const AWSService = AWS;
    const region = '<your bucket region>';
    const bucketName = '<bucket Name>';
    const IdentityPoolId = '<identity pool id>';
    const file = fileInput.target.files[0];
    this.fileName=file.name;
    
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
  
    this.showSummary=true;
   
    s3.upload({ Key: file.name, Bucket: bucketName, Body: file, ACL: 'private'}, (err, data)=> {
      this.fileuploading=false;
      if (err) {
       console.log(err, 'there was an error uploading your file');
     }else{
       this.s3response=data;
      
     }
   });
  
  }

  listAllFiles(){
    this.listLoading=true;
    const AWSService = AWS;
    const region = '<your bucket region>';
    const bucketName = '<bucket Name>';
    const IdentityPoolId = '<identity pool id>';

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

    s3.listObjects({Bucket:bucketName},(err,data)=>{
      this.listObjects=true;
      this.allfileslist=data.Contents;
      console.log(data.Contents);
      this.listLoading=false;
    });
  }
  

}
