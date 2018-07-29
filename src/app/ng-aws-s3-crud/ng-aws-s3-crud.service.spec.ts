import { TestBed, inject } from '@angular/core/testing';

import { NgAwsS3CrudService } from './ng-aws-s3-crud.service';

describe('NgAwsS3CrudService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NgAwsS3CrudService]
    });
  });

  it('should be created', inject([NgAwsS3CrudService], (service: NgAwsS3CrudService) => {
    expect(service).toBeTruthy();
  }));
});
