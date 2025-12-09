// ALIS-backend/config/firebaseAdmin.js
import admin from "firebase-admin";
import dotenv from "dotenv";

dotenv.config();

let serviceAccount = null;
if (process.env.FIREBASE_ADMIN_JSON) {
  try {
    serviceAccount = JSON.parse(process.env.FIREBASE_ADMIN_JSON);
  } catch (err) {
    console.error("Failed to parse FIREBASE_ADMIN_JSON:", err.message);
    serviceAccount = null;
  }
}

if (!admin.apps.length) {
  if (serviceAccount && Object.keys(serviceAccount).length) {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      storageBucket: process.env.FIREBASE_STORAGE_BUCKET || process.env.FIREBASE_BUCKET || "visioncoders-a4b62.appspot.com"
    });
    console.log("Firebase Admin initialized (service account).");
  } else {
    // initialize app without cert - some operations will fail
    try {
      admin.initializeApp();
      console.log("Firebase Admin initialized without service account (limited).");
    } catch (e) {
      console.error("Firebase init failed:", e.message);
    }
  }
}

export default admin;
