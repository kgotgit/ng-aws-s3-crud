import { NgAwsS3CrudModule } from './ng-aws-s3-crud.module';

describe('NgAwsS3CrudModule', () => {
  let ngAwsS3CrudModule: NgAwsS3CrudModule;

  beforeEach(() => {
    ngAwsS3CrudModule = new NgAwsS3CrudModule();
  });

  it('should create an instance', () => {
    expect(ngAwsS3CrudModule).toBeTruthy();
  });
});
