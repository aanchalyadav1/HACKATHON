// ALIS-backend/routes/stats.js
import express from "express";

const router = express.Router();

router.get("/stats", async (req, res) => {
  try {
    // Replace with DB reads later; return mock/summary now
    return res.json({
      sessions: 0,
      uploads: 0,
      typicalLoanRange: "₹5k+"
    });
  } catch (err) {
    console.error("Stats error:", err);
    return res.status(500).json({ success: false, error: "Failed to fetch stats" });
  }
});

export default router;
