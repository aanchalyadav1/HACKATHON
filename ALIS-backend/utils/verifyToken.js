// ALIS-backend/utils/verifyToken.js
import admin from "../config/firebaseAdmin.js";

export default async function verifyToken(req, res, next) {
  const header = req.headers.authorization || "";
  const match = header.match(/^Bearer (.+)$/);
  if (!match) return res.status(401).json({ success: false, error: "Missing Authorization" });

  const idToken = match[1];
  try {
    const decoded = await admin.auth().verifyIdToken(idToken);
    req.user = decoded;
    next();
  } catch (err) {
    console.error("Token verify error:", err.message || err);
    return res.status(401).json({ success: false, error: "Invalid token" });
  }
}
