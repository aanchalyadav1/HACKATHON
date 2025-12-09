// config/firebaseAdmin.js
import admin from "firebase-admin";

let serviceJson = process.env.FIREBASE_SERVICE_ACCOUNT;

if (!serviceJson) {
  throw new Error("❌ Missing FIREBASE_SERVICE_ACCOUNT environment variable!");
}

// IMPORTANT: Replace escaped newlines (\n) inside the private key
// If your private_key is properly escaped, this will fix formatting
serviceJson = serviceJson.replace(/\\n/g, "\n");

let serviceAccount;
try {
  serviceAccount = JSON.parse(serviceJson);
} catch (err) {
  console.error("❌ Failed to parse FIREBASE_SERVICE_ACCOUNT:", err);
  throw err;
}

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET, // ex: visioncoders-a4b62.appspot.com
});

console.log("✅ Firebase Admin initialized successfully");

export default admin;
