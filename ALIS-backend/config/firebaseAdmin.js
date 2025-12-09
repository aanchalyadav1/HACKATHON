import admin from "firebase-admin";

let serviceAccount;

// Prefer Base64 method (mobile/tablet safe)
if (process.env.FIREBASE_SERVICE_ACCOUNT_BASE64) {
  const decoded = Buffer.from(process.env.FIREBASE_SERVICE_ACCOUNT_BASE64, "base64").toString("utf8");
  serviceAccount = JSON.parse(decoded);
}
// Fallback to raw JSON method
else if (process.env.FIREBASE_SERVICE_ACCOUNT) {
  const fixed = process.env.FIREBASE_SERVICE_ACCOUNT.replace(/\\n/g, "\n");
  serviceAccount = JSON.parse(fixed);
} 
else {
  throw new Error("❌ No Firebase Admin credentials found.");
}

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
});

console.log("✅ Firebase Admin initialized");

export default admin;
