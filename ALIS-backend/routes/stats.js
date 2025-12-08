// ALIS-backend/routes/stats.js
import express from "express";
const router = express.Router();

router.get("/stats", async (req, res) => {
  // Replace with real DB queries when ready
  return res.json({
    sessions: 0,
    uploads: 0,
    typicalLoanRange: "₹5k+",
    note: "Mock stats — replace with DB when ready"
  });
});

export default router;
