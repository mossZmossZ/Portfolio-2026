import { NextResponse } from "next/server";
import { Client } from "minio";

const PROFILE_IMAGE_URL = process.env.PROFILE_IMAGE_URL;

const MINIO_ENDPOINT = process.env.MINIO_ENDPOINT || "172.16.88.102";
const MINIO_PORT = Number(process.env.MINIO_PORT || "7001");
const MINIO_USE_SSL = process.env.MINIO_USE_SSL === "true";

const MINIO_ACCESS_KEY = process.env.minio_username;
const MINIO_SECRET_KEY = process.env.minio_password;

const MINIO_BUCKET = process.env.MINIO_BUCKET || "nattavee";
const MINIO_OBJECT = process.env.MINIO_OBJECT || "nattavee.png";

const DIRECT_FALLBACK_URL =
  process.env.MINIO_IMAGE_URL || "http://172.16.88.102:7001/nattavee/nattavee.png";

let minioClient: Client | null = null;

if (MINIO_ACCESS_KEY && MINIO_SECRET_KEY) {
  minioClient = new Client({
    endPoint: MINIO_ENDPOINT,
    port: MINIO_PORT,
    useSSL: MINIO_USE_SSL,
    accessKey: MINIO_ACCESS_KEY,
    secretKey: MINIO_SECRET_KEY,
  });
}

export async function GET() {
  // If PROFILE_IMAGE_URL is set, always use it first.
  if (PROFILE_IMAGE_URL) {
    return NextResponse.redirect(PROFILE_IMAGE_URL);
  }

  // If we don't have credentials or client, just redirect to a direct URL (which may be local-only).
  if (!minioClient) {
    return NextResponse.redirect(DIRECT_FALLBACK_URL);
  }

  try {
    const url = await minioClient.presignedGetObject(MINIO_BUCKET, MINIO_OBJECT, 60 * 60);
    return NextResponse.redirect(url);
  } catch (error) {
    return NextResponse.redirect(DIRECT_FALLBACK_URL);
  }
}

