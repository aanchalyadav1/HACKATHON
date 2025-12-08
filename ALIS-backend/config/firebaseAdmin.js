// ALIS-backend/config/firebaseAdmin.js
import admin from "firebase-admin";
import dotenv from "dotenv";

dotenv.config();

let serviceAccount = {};
if (process.env.FIREBASE_ADMIN_KEY) {
  try {
    serviceAccount = JSON.parse(process.env.FIREBASE_ADMIN_KEY);
  } catch (e) {
    console.error("Failed parsing FIREBASE_ADMIN_KEY:", e.message);
    serviceAccount = {};
  }
}

if (!admin.apps.length) {
  const initOptions = serviceAccount && Object.keys(serviceAccount).length
    ? {
        credential: admin.credential.cert(serviceAccount),
        storageBucket: process.env.FIREBASE_STORAGE_BUCKET || process.env.FIREBASE_BUCKET || "visioncoders-a4b62.appspot.com",
      }
    : {}; // allow local dev without admin key (but many features will fail)

  admin.initializeApp(initOptions);
}

export default admin;
