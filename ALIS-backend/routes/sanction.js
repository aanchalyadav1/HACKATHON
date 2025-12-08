// ALIS-backend/routes/sanction.js
import express from "express";
import { generateSanctionPDF } from "../services/pdfService.js";
import { uploadBufferToStorage } from "../services/storageService.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { name, amount, plan } = req.body || {};
    const pdfBuffer = await generateSanctionPDF({ name, amount, plan });

    // Optionally upload the PDF to storage and return URL
    if (process.env.UPLOAD_SANCTION === "true") {
      const filename = `sanctions/sanction_${Date.now()}.pdf`;
      const { url } = await uploadBufferToStorage(pdfBuffer, filename, "application/pdf");
      return res.json({ success: true, url });
    }

    // Otherwise return as download (blob)
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", `attachment; filename="sanction_${Date.now()}.pdf"`);
    return res.send(pdfBuffer);
  } catch (err) {
    console.error("Sanction error:", err);
    return res.status(500).json({ success: false, error: err.message || "Failed to generate sanction" });
  }
});

export default router;
