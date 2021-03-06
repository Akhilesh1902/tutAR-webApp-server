import AWS from 'aws-sdk';

const Bucket = 'tutar-webapp';

export class AwsInstance {
  constructor() {
    this.connect();
    this.uploadParams = { Bucket, Key: '', Body: '' };
  }

  connect() {
    console.log('connecting to AWS');
    this.s3 = new AWS.S3({
      region: 'ap-south-1',
      accessKeyId: process.env.AWS_ACCESS_ID,
      secretAccessKey: process.env.AWS_ACCESS_KEY,
    });
  }

  uploadObject(buff, addr) {
    this.uploadParams.Body = buff;
    this.uploadParams.Key = addr;
    this.s3.upload(this.uploadParams, (err, data) => {
      if (err) console.log('error \n' + err);
      if (data) console.log('upload success' + data.Location);
    });
  }

  getObject(Key, socket) {
    const data = this.s3.getObject({ Bucket, Key }, (err, data) => {
      if (err) console.log(err);
      if (data) {
        console.log('success');
        // return data;
        socket.emit('_get_model', { model: data.Body });
      }
    });
    // console.log(data);
    // return data;
  }

  deleteObject(Key) {}
}
