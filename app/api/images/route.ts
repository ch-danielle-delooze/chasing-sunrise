import { NextRequest, NextResponse } from "next/server";
import {
  getSignedUrl
} from "@aws-sdk/s3-request-presigner";
import { GetObjectCommand } from "@aws-sdk/client-s3";

import { s3Client, bucketName } from "../awsS3Client";
import { getQueryParams } from "../utils";

const GET = async (request: NextRequest) => {
  const queryParams = getQueryParams(request.url);
  const command = new GetObjectCommand({
    Bucket: bucketName,
    Key: queryParams.get("key") ?? "",
  });

  const signedUrl = await getSignedUrl(s3Client, command, { expiresIn: 3600 });
  return NextResponse.json(signedUrl)
}

export { GET };
