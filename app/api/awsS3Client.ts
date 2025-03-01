import { S3Client } from "@aws-sdk/client-s3";

const bucketName = "chasing-sunrise-pictures";

const s3Client = new S3Client({
  credentials: {
    accessKeyId: process.env.CHASING_SUNRISE_AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.CHASING_SUNRISE_AWS_SECRET_ACCESS_KEY!
  },
  region: process.env.CHASING_SUNRISE_AWS_REGION
});

export {
  s3Client,
  bucketName
}