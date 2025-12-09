// ALIS-backend/routes/chat.js
import express from "express";
import { groqChat } from "../services/groqService.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { message, sessionId, user } = req.body || {};
    if (!message || !message.trim()) return res.status(400).json({ success: false, reply: "message required" });

    const reply = await groqChat(message);

    return res.json({
      success: true,
      reply,
      agent: "ALIS",
      sessionId: sessionId || Date.now().toString()
    });
  } catch (err) {
    console.error("Chat error:", err);
    return res.status(500).json({ success: false, reply: "Server error" });
  }
});

export default router;
