// ALIS-backend/services/storageService.js
import admin from "../config/firebaseAdmin.js";
import { v4 as uuidv4 } from "uuid";

export async function uploadBufferToStorage(buffer, destPath, contentType = "application/octet-stream") {
  try {
    const bucket = admin.storage().bucket();
    const file = bucket.file(destPath);

    const token = uuidv4();
    const metadata = {
      metadata: {
        firebaseStorageDownloadTokens: token
      },
      contentType,
      cacheControl: "public, max-age=31536000"
    };

    await file.save(buffer, { metadata });

    const bucketName = bucket.name || process.env.FIREBASE_STORAGE_BUCKET;
    const url = `https://firebasestorage.googleapis.com/v0/b/${bucketName}/o/${encodeURIComponent(destPath)}?alt=media&token=${token}`;
    return { url, path: destPath };
  } catch (err) {
    console.error("Storage upload error:", err);
    throw err;
  }
}
