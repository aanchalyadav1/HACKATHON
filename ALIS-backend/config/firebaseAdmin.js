// ALIS-backend/config/firebaseAdmin.js
import admin from "firebase-admin";
import dotenv from "dotenv";

dotenv.config();

// Expect the full service account JSON as a single-line env var named FIREBASE_ADMIN_KEY
const serviceAccount = JSON.parse(process.env.FIREBASE_ADMIN_KEY || "{}");

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET // <--- uses your variable name
  });
}

export default admin;
