import express from "express";
import admin from "../config/firebaseAdmin.js";

const router = express.Router();

// ---------------- REGISTER ----------------
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const user = await admin.auth().createUser({
      email,
      password,
      displayName: name
    });

    return res.json({ success: true, uid: user.uid });
  } catch (err) {
    return res.status(400).json({ success: false, error: err.message });
  }
});

// ---------------- LOGIN ----------------
router.post("/login", async (req, res) => {
  return res.json({
    success: false,
    error: "Login requires Firebase Client SDK. Use frontend login."
  });
});

export default router;
