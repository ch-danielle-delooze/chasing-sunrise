import { ListObjectsCommand } from "@aws-sdk/client-s3"
import { NextResponse } from "next/server"

import { s3Client, bucketName } from "../awsS3Client"

const GET = async () => {
  const command = new ListObjectsCommand({
    Bucket: bucketName,
  })
  const response = await s3Client.send(command)
  return NextResponse.json(response)
}

export { GET };