// utils/s3.js
import multer from "multer";
import crypto from "crypto";
import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
} from "@aws-sdk/client-s3";

const region = process.env.AWS_REGION;
const bucket = process.env.S3_BUCKET; // now dynamic: can be skillhive-userauth or skillhive-services

export const s3 = new S3Client({
  region,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

// Multer for images and PDFs up to 10MB
export const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const ok = [
      "image/jpeg",
      "image/png",
      "image/webp",
      "image/gif",
      "application/pdf",
    ].includes(file.mimetype);
    if (!ok)
      return cb(new Error("Only images (jpeg/png/webp/gif) and PDF allowed"));
    cb(null, true);
  },
});

export const publicUrlForKey = (key) =>
  `https://${bucket}.s3.${region}.amazonaws.com/${encodeURIComponent(key)}`;

export async function putObjectFromBuffer({
  buffer,
  contentType,
  keyPrefix = "profiles",
  userId,
}) {
  const ext =
    contentType === "application/pdf"
      ? "pdf"
      : (contentType?.split("/")[1] || "bin").toLowerCase();
  const rnd = crypto.randomBytes(8).toString("hex");
  const key = `${keyPrefix}/${userId}/${Date.now()}-${rnd}.${ext}`;

  const cmd = new PutObjectCommand({
    Bucket: bucket,
    Key: key,
    Body: buffer,
    ContentType: contentType || "application/octet-stream",
  });

  await s3.send(cmd);
  return { key, url: publicUrlForKey(key) };
}

export async function deleteObjectByKey(key) {
  if (!key) return;
  const cmd = new DeleteObjectCommand({ Bucket: bucket, Key: key });
  await s3.send(cmd);
}
