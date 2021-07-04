import * as fs from "fs";
import * as AWS from "aws-sdk";
import * as dotenv from "dotenv";
import process from "process";

dotenv.config();

const appName = process.env.appName || "";
const BUCKET_NAME = process.env.BUCKET_NAME || "";
const IAM_USER_KEY = process.env.IAM_USER_KEY || "";
const IAM_USER_SECRET = process.env.IAM_USER_SECRET || "";

const s3bucket = new AWS.S3({
  accessKeyId: IAM_USER_KEY,
  secretAccessKey: IAM_USER_SECRET,
});

export function uploadToS3(fileName: string): Promise<any> {
  const readStream = fs.createReadStream(fileName);

  const params = {
    Bucket: BUCKET_NAME,
    Key: appName + "/" + fileName,
    Body: readStream,
  };

  return new Promise((resolve, reject) => {
    s3bucket.upload(params, function (err: any, data: any) {
      readStream.destroy();
      if (err) {
        return reject(err);
      }
      return resolve(data);
    });
  });
}
