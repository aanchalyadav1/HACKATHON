// ALIS-backend/routes/chat.js
import express from "express";
import fetch from "node-fetch";

const router = express.Router();

// POST /api/chat - simple proxy/handler
router.post("/", async (req, res) => {
  try {
    const { message, sessionId, user } = req.body || {};
    if (!message) return res.status(400).json({ success: false, error: "message required" });

    // If GROQ/LLM configured, call it
    const GROQ_KEY = process.env.GROQ_API_KEY;
    if (GROQ_KEY) {
      // placeholder groq call - adapt to your Groq endpoint
      const response = await fetch("https://api.groq.ai/v1", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${GROQ_KEY}`,
        },
        body: JSON.stringify({ prompt: message }),
      });
      const data = await response.json();
      return res.json({ success: true, reply: data?.text || "No reply from LLM", agent: "ALIS" });
    }

    // fallback reply
    const reply = `No response`;
    return res.json({ success: true, reply, agent: "ALIS" });
  } catch (err) {
    console.error("Chat error:", err);
    return res.status(500).json({ success: false, error: err.message || "Chat failed" });
  }
});

export default router;
