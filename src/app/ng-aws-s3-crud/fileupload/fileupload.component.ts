import { Component, OnInit,ViewChild, Input } from '@angular/core';
import { FormGroup,FormControl} from '@angular/forms';
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
  bucketName:string="";
  awsRegion:string="";
  identityPoolId:string="";
  awsBucketForm: FormGroup;


  locationUrl:"";
  s3url:string="";
  fileUploadStaus:string="";
  fileName:string="";
  s3response:any=null;
  allfileslist:any[]=[];
  listObjects=false;
  listLoading:boolean=false;
  fileuploading:boolean=false;
  serviceBucketName:string="";


  constructor() { }

  ngOnInit() {
    this.awsBucketForm=this.createBucketForm();
  }

  createBucketForm(){
    return new FormGroup({
      awsRegion:new FormControl(""), 
      bucketName:new FormControl(""),
      identityPoolId:new FormControl("")
        });
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
  this.awsBucketForm=this.createBucketForm();
  }
 

  //Service to save files to s3 bucket
  selectFile(fileInput:any){
    this.fileuploading=true;
    this.awsBucketForm.value
    const AWSService = AWS;
    const file = fileInput.target.files[0];
    this.fileName=file.name;
    this.serviceBucketName=this.awsBucketForm.value.bucketName
  
    AWSService.config.update({
      region: this.awsBucketForm.value.awsRegion,
      credentials: new AWSService.CognitoIdentityCredentials({
        IdentityPoolId: this.awsBucketForm.value.identityPoolId
      }),
      
    });
  
  
    const s3 = new AWSService.S3({
      apiVersion: '2006-03-01',
      params: { Bucket: this.awsBucketForm.value.bucketName}
    });
  
  
  
    this.showSummary=true;
    s3.upload({
            Key: file.name, 
                Bucket: this.awsBucketForm.value.bucketName, 
                Body: file, 
                ACL: 'private'
          },(err,data)=>{
            this.fileuploading=false;
            this.locationUrl=data.Location;
            this.serviceBucketName=data.Bucket;
            this.s3response=data;
          });
  
  }

  //To list all files within a given bucket
  listAllFiles(){
    this.listLoading=true;
    const AWSService = AWS;
   
    AWSService.config.update({
      region: this.awsBucketForm.value.awsRegion,
      credentials: new AWSService.CognitoIdentityCredentials({
        IdentityPoolId: this.awsBucketForm.value.identityPoolId
      })
    });
    const s3 = new AWSService.S3({
      apiVersion: '2006-03-01',
      params: { Bucket: this.awsBucketForm.value.bucketName}
    });

    s3.listObjects({Bucket:this.awsBucketForm.value.bucketName},(err,data)=>{
      this.listObjects=true;
      this.allfileslist=data.Contents;
      this.listLoading=false;
    });
  
  }


}
