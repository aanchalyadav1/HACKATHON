// ALIS-backend/routes/upload.js
import express from "express";
import { uploadBufferToStorage } from "../services/storageService.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const f = req.files?.file || req.files?.salary;
    if (!f) return res.status(400).json({ success: false, error: "No file provided" });

    const filename = `salaries/${Date.now()}_${f.name}`;
    const { url, path } = await uploadBufferToStorage(f.data, filename, f.mimetype);

    return res.json({ success: true, url, path });
  } catch (err) {
    console.error("Upload error:", err);
    return res.status(500).json({ success: false, error: err.message || "Upload failed" });
  }
});

export default router;
