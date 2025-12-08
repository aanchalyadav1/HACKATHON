// ALIS-backend/services/storageService.js
import admin from "../config/firebaseAdmin.js";
import { v4 as uuidv4 } from "uuid";

export async function uploadBufferToStorage(buffer, destPath, contentType = "application/octet-stream") {
  const bucket = admin.storage().bucket();
  const file = bucket.file(destPath);
  const metadata = {
    metadata: {
      firebaseStorageDownloadTokens: uuidv4(),
    },
    contentType,
    cacheControl: "public, max-age=31536000",
  };

  await file.save(buffer, { metadata });
  const token = metadata.metadata.firebaseStorageDownloadTokens;
  // direct download link (works with token)
  const bucketName = bucket.name || process.env.FIREBASE_STORAGE_BUCKET;
  const url = `https://firebasestorage.googleapis.com/v0/b/${bucketName}/o/${encodeURIComponent(destPath)}?alt=media&token=${metadata.metadata.firebaseStorageDownloadTokens}`;
  return { url, path: destPath };
}
