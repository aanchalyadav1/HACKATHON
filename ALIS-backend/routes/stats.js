import express from "express";

const router = express.Router();

router.get("/stats", async (req, res) => {
  return res.json({
    activeSessions: 4,
    uploadedSlips: 3,
    typicalLoanRange: "₹5k - ₹1L"
  });
});

export default router;
