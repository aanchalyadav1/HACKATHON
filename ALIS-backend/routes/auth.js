// ALIS-backend/routes/auth.js
import express from "express";
import admin from "../config/firebaseAdmin.js";

const router = express.Router();

// Register (create user via Firebase Admin)
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!email || !password) return res.status(400).json({ success: false, error: "email & password required" });

    const userRecord = await admin.auth().createUser({
      email,
      password,
      displayName: name || ""
    });

    return res.json({ success: true, uid: userRecord.uid, email: userRecord.email });
  } catch (err) {
    console.error("Auth register error:", err);
    return res.status(400).json({ success: false, error: err.message || "Register failed" });
  }
});

// verify token (server-side helper)
router.post("/verify-token", async (req, res) => {
  try {
    const token = req.body.idToken || (req.headers.authorization && req.headers.authorization.split(" ")[1]);
    if (!token) return res.status(400).json({ success: false, error: "No token provided" });

    const decoded = await admin.auth().verifyIdToken(token);
    return res.json({ success: true, decoded });
  } catch (err) {
    console.error("Verify token error:", err);
    return res.status(401).json({ success: false, error: "Invalid token" });
  }
});

export default router;
