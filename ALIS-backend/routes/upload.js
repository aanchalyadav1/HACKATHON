// ALIS-backend/routes/upload.js
import express from "express";
import { uploadBufferToStorage } from "../services/storageService.js";

const router = express.Router();

// POST /api/upload-salary
router.post("/", async (req, res) => {
  try {
    // file may be in req.files.file or req.files.salary
    const f = (req.files && (req.files.file || req.files.salary)) || null;
    if (!f) return res.status(400).json({ success: false, error: "No file provided" });

    const filename = `salaries/${Date.now()}_${(f.name || "upload").replace(/\s+/g, "_")}`;
    const { url, path } = await uploadBufferToStorage(f.data, filename, f.mimetype || "application/octet-stream");

    return res.json({ success: true, url, path, message: "Uploaded" });
  } catch (err) {
    console.error("Upload error:", err);
    return res.status(500).json({ success: false, error: err.message || "Upload failed" });
  }
});

export default router;
