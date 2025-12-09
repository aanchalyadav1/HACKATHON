// ALIS-backend/routes/sanction.js
import express from "express";
import { generateSanctionPDF } from "../services/pdfService.js";
import { uploadBufferToStorage } from "../services/storageService.js";

const router = express.Router();

// POST /api/sanction - generate PDF and return (either download or upload URL)
router.post("/", async (req, res) => {
  try {
    const { name = "Applicant", amount = "₹0", plan = "Standard" } = req.body || {};
    const pdfBuffer = await generateSanctionPDF({ name, amount, plan });

    if (process.env.UPLOAD_SANCTION === "true") {
      const filename = `sanctions/sanction_${Date.now()}.pdf`;
      const { url } = await uploadBufferToStorage(pdfBuffer, filename, "application/pdf");
      return res.json({ success: true, url });
    }

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", `attachment; filename="sanction_${Date.now()}.pdf"`);
    return res.send(pdfBuffer);
  } catch (err) {
    console.error("Sanction error:", err);
    return res.status(500).json({ success: false, error: err.message || "Failed to generate sanction" });
  }
});

export default router;
